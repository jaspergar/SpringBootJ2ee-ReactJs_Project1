import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProjectTask } from "../../actions/backlogActions";

class ProjectTask extends Component {
  deletePT(backlog_id, pt_sequence) {
    this.props.deleteProjectTask(backlog_id, pt_sequence);
  }
  render() {
    const { project_task } = this.props;
    // const { backlog_id } = this.props.match.params;
    //LOGIC
    let priorityString;
    let priorityClass;
    if (project_task.priority === 1) {
      priorityString = "HIGH";
      priorityClass = "bg-danger text-light";
    }
    if (project_task.priority === 2) {
      priorityString = "MEDIUM";
      priorityClass = "bg-warning text-light";
    }
    if (project_task.priority === 3) {
      priorityString = "LOW";
      priorityClass = "bg-info text-light";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {project_task.projectSequence} -- Priority:{priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task.summary}</h5>
          <p className="card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            onClick={this.deletePT.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence
            )}
            className="btn btn-danger ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};
export default connect(null, { deleteProjectTask })(ProjectTask);
// export default ProjectTask;
