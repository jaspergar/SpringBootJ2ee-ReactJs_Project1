import React, { Component } from "react";
import classnames from "classnames";

class AddOrUpdateProjectForm extends Component {
  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project</h5>
              <hr />
              <form onSubmit={this.props.whenSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": this.props.errors.projectName
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.props.data.projectName}
                    onChange={this.props.handleChange}
                  />
                  {/* conditions */}
                  {this.props.errors.projectName && (
                    <div className="invalid-feedback">
                      {this.props.errors.projectName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.props.errors.projectIdentifier
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.props.data.projectIdentifier}
                    onChange={this.props.handleChange}
                  />
                  {/* conditions */}
                  {this.props.errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {this.props.errors.projectIdentifier}
                    </div>
                  )}
                </div>
                {/* <!-- disabled for Edit Only!! remove "disabled" for the Create operation --> */}
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

                  {/* conditions */}
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

export default AddOrUpdateProjectForm;
