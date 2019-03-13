import { LOGIN_USER, LOGIN_ERROR, LOGIN_REQUEST } from '../actions/types';

const initialState = {
  user: {},
  errors: {},
  isLoading: false,
  success: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        success: true,
        isLoading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload,
        success: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
