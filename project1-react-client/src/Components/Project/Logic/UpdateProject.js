import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectByProjectIdentifier } from "../../../actions/projectActions";
import PropTypes from "prop-types";
import { createProject } from "../../../actions/projectActions";
import AddOrUpdateProjectForm from "../Forms/AddOrUpdateProjectForm";

class UpdateProject extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
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
  //to display the data on the form
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = nextProps.project;
    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    });
  }
  //to get the project by project identifier
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProjectByProjectIdentifier(id, this.props.history);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  whenSubmit(event) {
    event.preventDefault();
    const updatedProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };
    this.props.createProject(updatedProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <AddOrUpdateProjectForm
          data={this.state}
          handleChange={this.handleChange}
          whenSubmit={this.whenSubmit}
          errors={errors}
        />
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProjectByProjectIdentifier: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getProjectByProjectIdentifier,
  createProject
})(UpdateProject);
