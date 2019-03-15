import { REGISTER_SUCCESS, REGISTER_TRIGGER, REGISTER_FAILED } from '../actions/types';

const initialState = {
  isSignedUp: false,
  isLoading: false,
  isVerified: false,
};

const registerReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case REGISTER_TRIGGER:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignedUp: true,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        isSignedUp: false,
      };
    default:
      return state;
  }
};

export default registerReducer;
