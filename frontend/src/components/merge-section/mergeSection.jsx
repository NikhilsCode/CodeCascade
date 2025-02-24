import React, { useState, useEffect } from "react";
import "./mergeSection.css";
import MultiSelectDropdown from "../MultiSelectDropdown";
import SingleSelectDropdown from "../SingleSelectDropdown";
import ApiRequest from "../../utils/api";


function MergeSection({ environment, envBranches, changeBranch, changeEnvironment }) {
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [environmentList, setEnvironmentList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [deploymentBranch, setDeploymentBranch] = useState({
    envId: "",
    envBranchName: "",
    deploymentEnvName: ""
  });


  useEffect(() => {
    setDeploymentBranch(environment);
    const simplifiedBranchList = envBranches.map(branch => ({
      id: branch.id,
      branchName: branch.branchName
    }));
    setSelectedBranch(simplifiedBranchList);

  }, [environment, envBranches]);


  useEffect(() => {
    environmentListApi();
    branchListApi();

  }, []);

  const environmentListApi = () => {
    ApiRequest("http://localhost:8090/environment/all", "Get")
      .then((res) => {
        setEnvironmentList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const branchListApi = () => {
    ApiRequest("http://localhost:8090/branch/allBranch", "Get")
      .then((res) => {
        setBranchList(res.data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleAddBranch = (data) => {
    setSelectedBranch(data)
    changeBranch(data);
  };

  const destinationBranchChanged = (data) => {
    setDeploymentBranch(data);
    changeEnvironment(data);
  }

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
              <MultiSelectDropdown listOfBranchSelected={selectedBranch} onSelect={handleAddBranch} listOfBranch={branchList} />
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

        </div>
      </div>

    </div>
  );
}

export default MergeSection;
