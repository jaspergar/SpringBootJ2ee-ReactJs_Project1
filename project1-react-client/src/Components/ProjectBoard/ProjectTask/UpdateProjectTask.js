import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import classnames from "classnames";
import { updateProjectTask } from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectSequence: "",
      projectIdentifier: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      create_At: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.whenSubmit = this.whenSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      projectSequence,
      projectIdentifier,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      create_At
    } = nextProps.project_task;

    this.setState({
      id,
      projectSequence,
      projectIdentifier,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      create_At
    });
  }

  componentDidMount() {
    const { backlog_id, pt_sequence } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_sequence);
  }

  whenSubmit(event) {
    event.preventDefault();
    const updatedPt = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      projectIdentifier: this.state.projectIdentifier,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      create_At: this.state.create_At
    };

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      updatedPt,
      this.props.history
    );
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }
  render() {
    const { errors } = this.state;
    const { backlog_id, pt_sequence } = this.props.match.params;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.whenSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    value={this.state.summary}
                    onChange={this.handleChange}
                    placeholder="Project Task summary"
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  project_task: state.backlog.project_task,
  errors: state.errors
});

export default connect(mapStateToProp, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
