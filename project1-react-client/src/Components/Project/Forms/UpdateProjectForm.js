import React, { Component } from "react";
import classnames from "classnames";

export default class UpdateProjectForm extends Component {
  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project</h5>
              <hr />
              <form onSubmit={this.props.whenSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": this.props.errors.projectName
                    })}
                    name="projectName"
                    value={this.props.data.projectName}
                    onChange={this.props.handleChange}
                    placeholder="Project Name"
                  />
                  {this.props.errors.projectName && (
                    <div className="invalid-feedback">
                      {this.props.errors.projectName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.props.data.projectIdentifier}
                    onChange={this.props.handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.description
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.props.data.description}
                    onChange={this.props.handleChange}
                  ></textarea>
                  {this.props.errors.description && (
                    <div className="invalid-feedback">
                      {this.props.errors.description}
                    </div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.props.data.start_date}
                    onChange={this.props.handleChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.props.data.end_date}
                    onChange={this.props.handleChange}
                  />
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
