import MergeSection from "../components/merge-section/mergeSection";
import React, { useState } from "react";
import EnvironmentDetails from "../components/enviromen-details/EnviromentDetails";
function Home() {
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
  return (
    <>
      <div className="m-2  h-100  py-4 px-4">
      {(isDeploying ||  !isDeploying && logs.length > 0) && <section className="container border p-3"> 
          
          <div>
            <h2>Deployment Status</h2>
            {isDeploying &&  <p>Deploying on going for {destinationBranch}</p>}
            {!isDeploying && logs.length > 0 &&  <p>Deployed</p>}
            
            <h2>Logs</h2>
            {logs.length > 0 ? (
              logs.map((log, logIndex) => (
                <div key={logIndex}>
                  <p>{log.branch && <>{log.branch}</>} {log.message} on {destinationBranch}</p>
                </div>
              ))
            ) : (
              <p>No logs yet.</p>
            )}
           

          </div>
         
        </section>
      }

        <MergeSection
          deploymentStateChanged= {deploymentStateChanged}
          deploymentLogChanged = {deploymentLogChanged}
          destinationBranchSelect= {destinationBranchSelect}
        />
        {/* <EnvironmentDetails/> */}
      </div>
    </>
  );
}

export default Home;
