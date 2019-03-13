import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import loginReducer from './login';

export default combineReducers({
  login: loginReducer,
  toastr: toastrReducer,
});
