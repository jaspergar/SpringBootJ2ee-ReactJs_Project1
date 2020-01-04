import React, { Component } from "react";
import AddProjectForm from "../Forms/AddProjectForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../../actions/projectActions";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.whenSubmit = this.whenSubmit.bind(this);
  }
  // life Cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  //

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  whenSubmit(event) {
    event.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <AddProjectForm
        handleChange={this.handleChange}
        whenSubmit={this.whenSubmit}
        data={this.state}
        errors={errors}
      />
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateErrorsToProps = state => ({
  errors: state.errors
});

export default connect(mapStateErrorsToProps, { createProject })(AddProject);
