import ApiRequest from "../utils/api";
import { useEffect, useState } from "react";

function Environments() {
    const [environmentList, setEnvironmentList] = useState([]);
    const [newEnvironment, setNewEnvironment] = useState({
        envBranchName: "",
        deploymentEnvName: ""
    });
    useEffect(() => {
        ApiRequest("http://localhost:8090/environment/all", "Get").then(res => {
            setEnvironmentList(res.data.sort((a,b)=> a.envId - b.envId));
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const addNewEnvironment = () => {
        if(newEnvironment.envBranchName == "" || newEnvironment.deploymentEnvName == ""){
            return;
        }
        ApiRequest("http://localhost:8090/environment/create", "Post", newEnvironment).then(res => {
            setEnvironmentList([...environmentList, res.data]);
            setNewEnvironment({
                envBranchName: "",
                deploymentEnvName: ""
            });
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <section className="container">
            <h1>Environments</h1>
            <div className="row border p-1 text-center">
                <div className="col-1"><h4>I    d</h4></div>
                <div className="col-4"><h4>Environment Branch Name</h4></div>
                <div className="col-4"><h4>Deployment Environment Name</h4></div>
            </div>
            {environmentList.map((environment, index) => (
                <div className="row border p-1 text-center">
                    <div className="col-1"><p>{environment.envId}</p></div>
                    <div className="col-4"><p>{environment.envBranchName}</p></div>
                    <div className="col-4"><p>{environment.deploymentEnvName}</p></div>
                </div>
            ))} 
            <div className="row border p-1 text-center">
            <div className="col-1"></div>
                <div className="col-5"><input type="text" value={newEnvironment.envBranchName} onChange={(e) => setNewEnvironment({...newEnvironment, envBranchName: e.target.value})} /></div>
                <div className="col-5"><input type="text" value={newEnvironment.deploymentEnvName} onChange={(e) => setNewEnvironment({...newEnvironment, deploymentEnvName: e.target.value})} /></div>
                <div className="col-1"><button onClick={addNewEnvironment}>Add</button></div>
            </div>
        </section>
    )
}
export default Environments;
