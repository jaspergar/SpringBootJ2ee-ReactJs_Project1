import axios from "axios";
import {
  GET_BACKLOG,
  DELETE_PROJECT_TASK,
  GET_ERRORS,
  GET_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  backlog_id,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, projectTask);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjectTasks = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjectTask = (backlog_id, pt_sequence) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlog_id}/${pt_sequence}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updateProjectTask = (
  backlog_id,
  pt_sequence,
  projectTask,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/backlog/${backlog_id}/${pt_sequence}`, projectTask);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteProjectTask = (
  backlog_id,
  pt_sequence
) => async dispatch => {
  if (
    window.confirm(
      `Are you sure you want to delete project task ${pt_sequence}?`
    )
  ) {
    await axios.delete(`/api/backlog/${backlog_id}/${pt_sequence}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: pt_sequence
    });
  }
};
