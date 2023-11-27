import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="navbar bg-base-100"
        style={{ backgroundColor: "#72693E" }}
      >
        <div className="navbar-start">
          <div className="dropdown"></div>
          <a className="btn btn-ghost text-xl" style={{ color: "#FCFAD1" }}>
            MultiSafe
          </a>
        </div>
        <div className="navbar-end">
          <a
            className="btn"
            style={{ backgroundColor: "#FCFAD1", color: "#72693E" }}
            type="submit"
            onClick={() => {localStorage.removeItem('userWallet'); navigate('/')}}
          >
            LOGOUT
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
