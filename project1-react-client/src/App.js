import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./Components/Project/Logic/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./Components/Project/Logic/UpdateProject";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashBoard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
