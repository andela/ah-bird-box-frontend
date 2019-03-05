import { SIMPLE_ACTION } from '../actions/types';


const initialState = { text: null };
export default function (state = initialState, action) {
  switch (action.type) {
    case SIMPLE_ACTION:
      return { ...state, text: action.payload };
    default:
      return state;
  }
}
