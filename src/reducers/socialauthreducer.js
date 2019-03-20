import { SOCIAL_LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from '../actions/types';

export const initialState = {
  isLoading: false,
  error: false,
};

const SocialAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
        message: 'fetching user details',
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        message: 'success',
        isLoading: false,
        error: false,
        errors: {},
      };
    case SOCIAL_LOGIN_ERROR:
      return {
        ...action.payload,
        message: 'failed',
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default SocialAuthReducer;
