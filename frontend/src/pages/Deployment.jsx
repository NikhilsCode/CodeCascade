import { useState, useEffect } from "react";
import ApiRequest from "../utils/api";
import MergeSection from "../components/merge-section/mergeSection";
import { handleSSEResponse } from "../utils/sseUtils";
import "./Deployment.css";
function Deployment() {

    const [deploymentList, setDeploymentList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [environment, setEnvironment] = useState({
        envId: "",
        envBranchName: "",
        deploymentEnvName: ""
    });

    const [logs, setLogs] = useState([]);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployingBranch, setDeployingBranch] = useState({});


    const changeEnvironment = (data) => {
        setEnvironment(data);
    }
    const changeBranch = (data) => {
        setBranchList(data);
    }
    const manageDeploy = (data) => {
        setEnvironment({
            envId: data.envId,
            envBranchName: data.envBranchName,
            deploymentEnvName: data.deploymentEnvName
            
        });
        setBranchList(data.branches);
    }
    useEffect(() => {
        getdeploymentListApi();
    }, []);

    const getdeploymentListApi = () => {
        ApiRequest("http://localhost:8090/deploy/list", "Get").then(res => {
            console.log(res.data);
            setDeploymentList(res.data);
        }).catch(error => {
            console.log(error);
        });
    }
    const singleBranchDeploy = (env, branch) => {
        
        let payload = {
            envId: env.envId,
            deploymentEnvName: env.deploymentEnvName,
            listOfBranch: [branch],
            deploymentType : 2,
        };
        setDeployingBranch(env)
        deploy(payload);
    }
    const multipleBranchDeploy = () => {
       
        let payload = {
            envId: environment.envId,
            deploymentEnvName: environment.deploymentEnvName,
            listOfBranch: branchList,
            deploymentType : 1,
        };
        setDeployingBranch(environment)
        deploy(payload);
    }
    const deploy = (payload) => {
        setLogs([]);
        setIsDeploying(true);



        console.log(payload);
        fetch("http://localhost:8090/deploy/deployBranch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(response => {
            handleSSEResponse(response, {
                onData: (data) => {
                    setLogs(prevLogs => {
                        const updatedLogs = [...prevLogs, data];
                        return updatedLogs;
                    });
                    if (data.statusCode === 200) {
                        
                        setIsDeploying(false);
                    }
                },
                onComplete: () => {
                    setIsDeploying(false);
                    getdeploymentListApi();
                },
                onError: (error) => {
                    console.error("SSE Error:", error);
                    setIsDeploying(false);
                }
            });
        }).catch(error => {
            console.error("SSE Error:", error);
            setIsDeploying(false);
        });
    };




    return (
        <section className="container">
            <h1>Deployment</h1>
            <section >
                <div className=" m-2  h-100  py-4 px-4">
                    {(isDeploying || !isDeploying && logs.length > 0) && <section className="container  border p-3">

                        <div>
                            <h2>Deployment Status</h2>
                            {isDeploying && <p>Deploying on going for {deployingBranch.envBranchName}</p>}
                            {!isDeploying && logs.length > 0 && <p>Deployed on {deployingBranch.envBranchName}</p>}

                            <h2>Logs</h2>
                            <div className="deployment-continer">
                                {logs.length > 0 ? (
                                    logs.map((log, logIndex) => (

                                        <div key={logIndex}>

                                            <p>{log.data && (log.code == 102 || log.code == 103) && <>{log.data}</>}</p>
                                            <p>{log.data && (log.code == 200) && <>{log.message}</>}</p>

                                        </div>
                                    ))
                                ) : (
                                    <p>No logs yet.</p>
                                )}
                            </div>

                        </div>

                    </section>
                    }

                    <MergeSection
                        changeEnvironment={changeEnvironment}
                        changeBranch={changeBranch}
                        environment={environment}
                        envBranches={branchList}
                    />
                    <div className="form-floating my-2 d-block">
                        <button className="deployButton" onClick={multipleBranchDeploy}>Deploy </button>
                    </div>
                    {/* <EnvironmentDetails/> */}
                </div>
            </section>
            <section className="container">

                <div className="container py-4">

                    <div className="environment-container">
                        {deploymentList.map((env, index) => (
                            <div key={index} className="environment-card">
                                <div className="row">
                                    <div className="col-8">
                                        <h6>{env.envBranchName}</h6>
                                    </div>
                                    <div className="col-4">
                                        <button className="btn btn-primary" onClick={() => manageDeploy(env)}>ManageDeploy</button>
                                    </div>
                                </div>

                                <p className="text-muted">
                                    <i className="bi bi-branches"></i> Live branches
                                </p>
                                <ul className="list-unstyled">
                                    {env.branches.map((branch, i) => (
                                        <li key={branch.id}>
                                            <div className="row m-1">
                                                <div className="col-10">  {branch.branchName}  <small className="text-muted ms-2">{branch.timeStamp}</small></div>
                                                <div className="col-2">
                                                    <button className="btn btn-primary" onClick={() => singleBranchDeploy(env, branch)}><i class="bi bi-arrow-clockwise"></i></button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>

    )
}
export default Deployment;

