import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav style={{ backgroundColor: "#1D263B" }}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/casino">Casino</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
