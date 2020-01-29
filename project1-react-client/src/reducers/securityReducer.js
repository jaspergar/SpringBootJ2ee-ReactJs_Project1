import { SET_USER, GET_ERRORS_LOGIN } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
  errors: {}
};

const booleanActionPayload = payload => {
  // payload ?  true :  false;
  if (payload) {
    return true;
  } else {
    return false;
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        validToken: booleanActionPayload(action.payload)
      };
    case GET_ERRORS_LOGIN:
      return {
        errors: action.payload
      };

    default:
      return state;
  }
}
