import { useState, useEffect } from "react";
import ApiRequest from "../utils/api";
import MergeSection from "../components/merge-section/mergeSection";
function Deployment() {
    
    const [deploymentList, setDeploymentList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [environment, setEnvironment] = useState({
        envId: "",
        envBranchName: "",
    });
    const [logs, setLogs] = useState([]);
    const [isDeploying, setIsDeploying] = useState(false);
    const [destinationBranch, setDestinationBranch] = useState("")

    const deploymentStateChanged=(data)=> {
        setIsDeploying(data);
      }
    const deploymentLogChanged= (data)=> {
        console.log(data)
        setLogs(data);
    }
    const destinationBranchSelect = (data)=>{
    setDestinationBranch(data);
        
    }
    const manageDeploy = (data)=>{
        setEnvironment({
            envId: data.envId,
            envBranchName: data.envBranchName,
            deploymentEnvName:data.deploymentEnvName
        });
        setBranchList(data.branches);
    }
    useEffect(() => {
        ApiRequest("http://localhost:8090/deploy/list", "Get").then(res => {
            console.log(res.data);
            setDeploymentList(res.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <section className="container">
            <h1>Deployment</h1>
            <section >
                <div className="m-2  h-100  py-4 px-4">
                    {(isDeploying || !isDeploying && logs.length > 0) && <section className="container border p-3">

                        <div>
                            <h2>Deployment Status</h2>
                            {isDeploying && <p>Deploying on going for {destinationBranch.envBranchName}</p>}
                            {!isDeploying && logs.length > 0 && <p>Deployed</p>}

                            <h2>Logs</h2>
                            {logs.length > 0 ? (
                                logs.map((log, logIndex) => (
                                    
                                    <div key={logIndex}>
                                        
                                        <p>{log.data && (log.code == 102 || log.code == 103) && <>{log.data}</>}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No logs yet.</p>
                            )}


                        </div>

                    </section>
                    }

                    <MergeSection
                        deploymentStateChanged={deploymentStateChanged}
                        deploymentLogChanged={deploymentLogChanged}
                        destinationBranchSelect={destinationBranchSelect}
                        environment={environment}
                        envBranches={branchList}
                    />
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
                                        <button className="btn btn-primary" onClick={()=>manageDeploy(env)}>ManageDeploy</button>
                                    </div>
                                </div>
                              
                                <p className="text-muted">
                                    <i className="bi bi-branches"></i> Live branches
                                </p>
                                <ul className="list-unstyled">
                                    {env.branches.map((branch, i) => (
                                        <li key={branch.id}>
                                            {branch.branchName}
                                            <small className="text-muted ms-2">{branch.timeStamp}</small>
                                            <hr className="p-0 my-1" />
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

