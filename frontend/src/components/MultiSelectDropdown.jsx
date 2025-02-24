import { useState, useEffect, useRef } from "react";
import ApiRequest from "../utils/api";
import "./MultiSelectDropdown.css";

const MultiSelectDropdown = ({ listOfBranchSelected, onSelect, listOfBranch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const dropdownRef = useRef(null);
  const [filteredBranchList, setFilteredBranchList] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    
    
    setSelectedBranches(listOfBranchSelected);
    setBranchList(listOfBranch)
    setFilteredBranchList(listOfBranch)
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listOfBranch, listOfBranchSelected]);


  const handleSearch = (e) => {
    setIsOpen(true);
    if(e.target.value.length > 3){
      const filteredList = branchList.filter((branch) => branch.branchName.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredBranchList(filteredList);
    }else{
      setFilteredBranchList(branchList);
    }
  }
  const handleSelect = (branch) => {
    const alreadySelected = selectedBranches.find((b) => b.id === branch.id);

    if (alreadySelected) {
      const updatedSelection = selectedBranches.filter((b) => b.id !== branch.id);
      setSelectedBranches(updatedSelection);
      onSelect(updatedSelection);
    } else {
      const updatedSelection = [...selectedBranches, branch];
      setSelectedBranches(updatedSelection);
      onSelect(updatedSelection);
    }
  };

  const removeBranch = (branch) => {
    const updatedSelection = selectedBranches.filter((b) => b.id !== branch.id);
    setSelectedBranches(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div className="position-relative w-64" ref={dropdownRef}>
      <div
        className="d-flex justify-content-between p-2 border rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >

        
        <input type="text" className="form-control border-0" onChange={handleSearch} placeholder="Search Branch" />
        <span>▼</span>
      </div>

      {isOpen && (
        <div className="multi-select-dropdown position-absolute ">
          {filteredBranchList.map((branch) => (
            <div
              key={branch.id}
              onClick={() => handleSelect(branch)}
              className={`p-2 hover:bg-blue-100 cursor-pointer ${selectedBranches.find((b) => b.id === branch.id) ? "selected-branch" : ""}`}
            >
              {branch.branchName}
            </div>
          ))}
        </div>
      )}

      

      <div className="d-flex flex-wrap">
            {selectedBranches.map((branch, branchIndex) => (
              <div key={branchIndex} className="custommultiSelect-card d-flex">
                <p className="custommultiSelect-card-paragraph"> {branch.branchName}</p>
                <button
                  className="custommultiSelect-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBranch(branch);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
    </div>
  );
};

export default MultiSelectDropdown;
