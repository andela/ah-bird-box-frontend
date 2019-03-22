import { PROVIDE_EMAIL, REQUEST_EMAIL, EMAIL_ERROR } from '../actions/types';

export const initialState = {
  isSent: false,
  isUpdated: false,
  message: {},
  errors: {},
};

const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVIDE_EMAIL:
      return {
        ...state,
        isSent: true,
        message: action.payload.message,
      };
    case REQUEST_EMAIL:
      return {
        ...state,
      };
    case EMAIL_ERROR:
      return {
        ...state,
        isSent: false,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
