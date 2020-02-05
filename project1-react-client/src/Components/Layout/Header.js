import React, { Component } from "react";
import GotoDashBoardButton from "../Project/RouteButtons/GotoDashBoardButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/securityActions";
import PropTypes from "prop-types";

class Header extends Component {
  logout() {
    this.props.logoutUser();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {validToken && user && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <GotoDashBoardButton />
                </li>
              </ul>
            )}
            {validToken && user ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link " to="/dashboard">
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={this.logout.bind(this)}
                  >
                    logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link " to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  security: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  security: state.security
});
export default connect(mapStateToProps, { logoutUser })(Header);
