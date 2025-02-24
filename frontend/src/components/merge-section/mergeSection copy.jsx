import React, { useState, useEffect } from "react";
import "./mergeSection.css";
import axios from "axios";
import MultiSelectDropdown from "../MultiSelectDropdown";
import SingleSelectDropdown from "../SingleSelectDropdown";
import ApiRequest from "../../utils/api";
function MergeSection({ deploymentLogChanged, deploymentStateChanged, destinationBranchSelect, environment, envBranches }) {
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [environmentList, setEnvironmentList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [deploymentBranch, setDeploymentBranch] = useState({
    envId: "",
    envBranchName: "",
    deploymentEnvName: ""
  });
  const [logs, setLogs] = useState([]);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    setDeploymentBranch(environment);
    const simplifiedBranchList = envBranches.map(branch => ({
      id: branch.id,
      branchName: branch.branchName
    }));
    setSelectedBranch(simplifiedBranchList);
    
  }, [environment, envBranches]);


  useEffect(() => {
      ApiRequest("http://localhost:8090/environment/all", "Get")
    .then((res) => {
      setEnvironmentList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

    ApiRequest("http://localhost:8090/branch/allBranch", "Get")
    .then((res) => {
      setBranchList(res.data.sort((a, b) => a.id - b.id));
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleAddBranch = (data) => {
    setSelectedBranch(data)
  };

  const destinationBranchChanged = (data) => {
    setDeploymentBranch(data);
    destinationBranchSelect(data)

  }
  const deploy = () => {
    setLogs([]);
    deploymentLogChanged([])
    setIsDeploying(true);
    deploymentStateChanged(true)

    let payload = {
      envId: deploymentBranch.envId,
      deploymentEnvName: deploymentBranch.deploymentEnvName,
      listOfBranch: selectedBranch,
    };
    // Use Fetch API with POST request and SSE (Server-Sent Events)
    fetch("http://localhost:8090/deploy/deployBranch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(response => {
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
            <div className="col-12">
              <MultiSelectDropdown listOfBranchSelected={selectedBranch} onSelect={handleAddBranch}  listOfBranch={branchList} />
            </div>

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
            <SingleSelectDropdown selectedEnvironment={deploymentBranch} onSelect={destinationBranchChanged} listOfEnvironment={environmentList} />
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
