import { REQUEST_UPDATE, UPDATE_PASSWORD, UPDATE_ERROR } from '../actions/types';

const initialState = {
  isSent: false,
  isUpdated: false,
  message: {},
  errors: {},
};

const updatePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_UPDATE:
      return {
        ...state,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        isUpdated: true,
        message: action.payload.message,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        isUpdated: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default updatePasswordReducer;
