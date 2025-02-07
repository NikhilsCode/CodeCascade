import React, { useState } from "react";
import "./mergeSection.css";
import axios from "axios";

function MergeSection({deploymentLogChanged , deploymentStateChanged, destinationBranchSelect}) {
  const [listOfBranch, setListOfBranch] = useState(["Transfer2.0_dev_temp", "dev_temp", "demo_master"]);
  const [newBranch, setNewBranch] = useState("  ");
  const [deploymentBranch, setDeploymentBranch] = useState("");
  const [logs, setLogs] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);

 
  // Add branch to list
  const handleAddBranch = () => {
    if (newBranch && !listOfBranch.includes(newBranch)) {
      setListOfBranch([...listOfBranch, newBranch]);
      setNewBranch(""); // Clear input field after adding
    }
  };

  // Remove branch from list
  const handleRemoveBranch = (branchToRemove) => {
    setListOfBranch(listOfBranch.filter((branch) => branch !== branchToRemove));
  };

  const destinationBranchChanged = (data)=>{
    setDeploymentBranch(data);
    destinationBranchSelect(data)

  }
  const deploy = () => {
    setLogs([]);
    deploymentLogChanged([])
    setIsDeploying(true);
    deploymentStateChanged(true)
  
    let payload = {
      listOfBranch: listOfBranch,
      deploymentBranch: deploymentBranch
    };
  
    // Use Fetch API with POST request and SSE (Server-Sent Events)
    fetch("http://localhost:8090/deploy/deployBranch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.body) throw new Error("ReadableStream not supported");
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let partialData = "";
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log("Stream closed");
              setIsDeploying(false);
              deploymentStateChanged(false)
              return;
            }
  
            // Convert Uint8Array to String and accumulate data
            partialData += decoder.decode(value, { stream: true });
  
            // Process all complete JSON objects in the accumulated buffer
            let lines = partialData.split("\n");
            partialData = ""; // Reset buffer
  
            lines.forEach(line => {
              if (line.startsWith("data:")) {
                try {
                  const jsonString = line.replace("data:", "").trim();
                  const data = JSON.parse(jsonString);
                  setLogs(prevLogs => {
                    const updatedLogs = [...prevLogs, data];
                    deploymentLogChanged(updatedLogs); // Pass the updated logs
                    return updatedLogs;
                  });
                  console.log("Received:", data);
  
                  if (data.statusCode === 200) {
                    setIsDeploying(false);
                    deploymentStateChanged(false);
                  }
                } catch (error) {
                  // If JSON parsing fails, it means we have an incomplete chunk. Store it in the buffer.
                  partialData = line;
                }
              }
            });
  
            readStream(); // Continue reading stream
          });
        };
  
        readStream();
      })
      .catch(error => {
        console.error("SSE Error:", error);
        setIsDeploying(false);
        deploymentStateChanged(false)
      });
  };
  



  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between">
        {/* Source Repository Section */}
        <div className="d-flex flex-column border px-4 py-3 rounded w-50">
          <span className="fw-bold mb-2">Source Repository</span>
          <span className="mb-4">
            <i className="bi bi-code me-2"></i> Branch Name
          </span>
          <span className="fw-bold mb-2">Source Branch</span>
          <div className="row">
            <div className="col-8">
              <input
                className="input-group"
                id="sourceBranchSelect"
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
              />
            </div>
            <div className="col-3">
              <button className="" onClick={handleAddBranch}>
                Add
              </button>
            </div>
          </div>
          <div className="d-flex">
            {listOfBranch.map((branch, branchIndex) => (
              <div key={branchIndex} className="custommultiSelect-card d-flex">
                <p className="custommultiSelect-card-paragraph"> {branch}</p>
                <button
                  className="custommultiSelect-card-button"
                  onClick={() => handleRemoveBranch(branch)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="d-flex align-items-center mx-4">
          <i className="bi bi-arrow-right fs-1"></i>
        </div>

        {/* Destination Repository Section */}
        <div className="d-flex flex-column border px-4 py-3 rounded w-50">
          <span className="fw-bold mb-2">Destination Repository</span>
          <span className="mb-4">
            <i className="bi bi-code me-2"></i> manager_project/project...
          </span>
          <span className="fw-bold mb-2">Destination Environment</span>
          <div className="form-floating">
            <input className="input-group" id="destinationBranchSelect" value={deploymentBranch}  onChange={(e) => destinationBranchChanged(e.target.value)} />
          </div>
          <div className="form-floating my-2 d-block">
           <button className="deployButton" onClick={deploy}>Deploy </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default MergeSection;
