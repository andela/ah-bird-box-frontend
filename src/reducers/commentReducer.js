import objectAssign from 'object-assign';
import {
  GET_COMMENTS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT,
  START_EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  START_DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  REPLY_COMMENT_START,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAILIURE,
} from '../actions/types';

const initialState = {
  comments: [],
  isFetched: false,
  isCreated: false,
  creating: false,
  isEdited: false,
  isDeleted: false,
  editing: false,
  isReplied: false,
  replying: false,
};
export default function getCommentstReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS: {
      return objectAssign({}, state, { comments: action.payload });
    }

    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };

    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isFetched: true,
      };

    case CREATE_COMMENT: {
      return {
        ...state,
      };
    }

    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isCreated: false,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        isCreated: true,
      };

    case START_EDIT:
      return {
        ...state,
        editing: true,
      };

    case EDIT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        isEdited: true,
        editing: false,
      };

    case EDIT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isEdited: false,
        editing: false,
      };
    case START_DELETE_COMMENT: {
      return {
        ...state,
      };
    }

    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        errors: action.payload,
        isDeleted: false,
      };
    }

    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        delete: action.payload,
        isDeleted: true,
      };
    }

    case REPLY_COMMENT_START: {
      return {
        ...state,
        replying: true,
      };
    }

    case REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        isReplied: false,
        replying: false,
      };

    case REPLY_COMMENT_FAILIURE:
      return {
        ...state,
        errors: action.payload,
        isReplied: false,
        replying: false,
      };

    default:
      return state;
  }
}
