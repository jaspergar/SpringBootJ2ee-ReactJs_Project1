import React from "react";
import { Link } from "react-router-dom";

function GotoDashBoardButton() {
  return (
    <React.Fragment>
      <Link to="/dashboard" className="nav-link">
        Dashboard
      </Link>
    </React.Fragment>
  );
}

export default GotoDashBoardButton;
