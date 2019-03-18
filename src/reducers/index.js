import { combineReducers } from 'redux';
import { reducer as toastReeducer } from 'react-redux-toastr';
import profileReducer from './profileReducer';
import loginReducer from './login';
import verifyReducer from './verifyReducer';
import registerReducer from './registerReducer';
import SocialAuthReducer from './socialauthreducer';

export default combineReducers({
  verify: verifyReducer,
  register: registerReducer,
  profile: profileReducer,
  toastr: toastReeducer,
  login: loginReducer,
  socialAuth: SocialAuthReducer,
});
