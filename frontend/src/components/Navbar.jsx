// src/components/Navbar.js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex">
            <div className="img-fluid me-2">
              <img src="vite.svg"></img>
            </div>
            <Link className="navbar-brand" to="/branch">
               Branch
            </Link>
            <Link className="navbar-brand disabled" to="/environments" disabled>
              Enviroments
            </Link>
            <Link className="navbar-brand" to="/deployment">
              Deployment
            </Link>
          </div>
         
        </div>
      </nav>
    </>
  );
}

export default Navbar;
