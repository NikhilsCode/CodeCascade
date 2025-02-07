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
            <Link className="navbar-brand" to="/">
              branches
            </Link>
            <Link className="navbar-brand disabled" to="/about" disabled>
              enviroments
            </Link>
            <Link className="navbar-brand" to="/about">
              settings
            </Link>
          </div>
          <div className="d-flex">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <button className="input-group-text" id="basic-addon2">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
