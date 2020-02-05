import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./Components/Project/Logic/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./Components/Project/Logic/UpdateProject";
import ProjectBoard from "./Components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./Components/ProjectBoard/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./Components/ProjectBoard/ProjectTask/UpdateProjectTask";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import setJWTToken from "./Components/SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_USER } from "./actions/types";
import { logoutUser } from "./actions/securityActions";
import SecuredRoutes from "./Components/SecurityUtils/SecuredRoutes";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_token = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_USER,
    payload: decoded_token
  });

  const currentTime = Date.now() / 1000;

  if (decoded_token.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <SecuredRoutes exact path="/dashboard" component={Dashboard} />
              <SecuredRoutes exact path="/addProject" component={AddProject} />
              <SecuredRoutes
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoutes
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoutes
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoutes
                exact
                path="/updateProjectTask/:backlog_id/:pt_sequence"
                component={UpdateProjectTask}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
