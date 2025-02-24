import { useState, useEffect, useRef } from "react";
import ApiRequest from "../utils/api";
import "./SingleSelectDropdown.css";

const SingleSelectDropdown = ({ selectedEnvironment, onSelect, listOfEnvironment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [environmentList, setEnvironmentList] = useState([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    setSelectedEnv(selectedEnvironment);
    setEnvironmentList(listOfEnvironment.sort((a, b) => a.envId - b.envId));
        const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedEnvironment, listOfEnvironment]);

  const handleSelect = (environment) => {
    setSelectedEnv(environment);
    onSelect(environment);
    setIsOpen(false);
  };

  return (
    <div className="position-relative w-64" ref={dropdownRef}>
      <div
        className="d-flex justify-content-between p-2 border rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>
          {selectedEnv ? selectedEnv.envBranchName : "Select Environment"}
        </span>
        <span>▼</span>
      </div>

      {isOpen && (
        <div className="single-select-dropdown position-absolute">
          {environmentList.map((environment) => (
            <div
              key={environment.envId}
              onClick={() => handleSelect(environment)}
              className={`p-2 hover:bg-blue-100 cursor-pointer ${
                selectedEnv?.envId === environment.envId ? "selected-environment" : ""
              }`}
            >
              {environment.envBranchName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown; 