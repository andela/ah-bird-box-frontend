import { VERIFY_SUCCESS, VERIFY_FAIL, VERIFY_TRIGGER } from '../actions/types';

const initialState = {
  isLoading: false,
  isVerified: false,
  isTriggered: false,
  failed: false,
};

const verifyReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case VERIFY_TRIGGER:
      return {
        ...state,
        isLoading: true,
        isTriggered: true,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVerified: true,
      };
    case VERIFY_FAIL:
      return {
        ...state,
        isLoading: false,
        failed: true,
      };
    default:
      return state;
  }
};

export default verifyReducer;
