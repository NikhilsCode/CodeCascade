import { Button } from "bootstrap";
import ApiRequest from "../utils/api";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";
function About() {
    const [branchList, setBranchList] = useState([]);
    const [newBranch , setNewBranch] = useState("");
    useEffect(() => {
       
        ApiRequest("http://localhost:8090/branch/allBranch","Get" ).then(res=>{
            setBranchList(res.data.sort((a,b)=> a.id - b.id))
        }).catch((error)=> {
            console.log(error)
        })
        return () => {
          console.log("Component unmounted!");
        };
      }, []);

    const addNewBranch = ()=>{
      if(newBranch == ""){
        return "";
      }
      const payload = {
        branchName :  newBranch
      }
      ApiRequest("http://localhost:8090/branch/create","Post" ,  payload  ).then(res => {
        if(res.code ==200){  
          setBranchList([...branchList, res.data]);
          setNewBranch("");
        }else {
          alert("Failed to add branch");
        }
     
      }).catch(error => {
        console.log(error);
      })
    }


    return (
        <section className="container py-4">
          <h1>Branches</h1>
          <div className="p1">
            <div className="row border p-1 text-center">
                <div className="col-2"><h4>Branch id</h4></div>
                <div className="col-9"><h4>Branch Name</h4></div>
                <div className="col-1"><h4>Delete</h4></div>
            </div>

            {branchList.map((branch, i) => (
                <div className="row border p-1 text-center">
                    <div className="col-2"><p>{branch.id}</p></div>
                    <div className="col-9"><p>{branch.branchName}</p></div>
                    <div className="col-1"><button><i class="bi bi-trash3"></i></button></div>

                 </div>
            ))}
             
             <div className="row border p-1 ">
                    <div className="col-10">
                        <input 
                            type="text" 
                            value={newBranch} 
                            onChange={(e) => setNewBranch(e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <button onClick={addNewBranch}>Add</button>
                    </div>
               </div>
        

          </div>
          
        </section>
      );
    
    
    
    
    
  
}
  
  export default About;