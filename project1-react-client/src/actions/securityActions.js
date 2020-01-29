import axios from "axios";
import { GET_ERRORS, SET_USER, GET_ERRORS_LOGIN } from "./types";
import setJWTToken from "../Components/SecurityUtils/setJWTToken";
import jwt_Decode from "jwt-decode";

export const createUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
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

export const loginUser = loginRequest => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", loginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decoded = jwt_Decode(token);
    dispatch({
      type: SET_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS_LOGIN,
      payload: error.response.data
    });
  }
};
