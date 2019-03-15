import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import loginReducer from './login';
import verifyReducer from './verifyReducer';
import registerReducer from './registerReducer';

export default combineReducers({
  verify: verifyReducer,
  register: registerReducer,
  toastr: toastrReducer,
  login: loginReducer,
});
