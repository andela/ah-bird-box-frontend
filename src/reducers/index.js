import { combineReducers } from 'redux';
import { reducer as toastReeducer } from 'react-redux-toastr';
import profileReducer from './profileReducer';
import loginReducer from './login';
import verifyReducer from './verifyReducer';
import registerReducer from './registerReducer';
import SocialAuthReducer from './socialauthreducer';
import fetchProfilesReducers from './fetchProfilesReducer';
import specificProfileReducer from './specificProfileReducer';
import resetPasswordReducer from './resetPasswordReducer';
import updatePasswordReducer from './updatePasswordReducer';
import ArticlesReducer from './articlesReducer';
import getAllArticlesReducer from './listArticlesReducer';

export default combineReducers({
  verify: verifyReducer,
  register: registerReducer,
  profile: profileReducer,
  toastr: toastReeducer,
  login: loginReducer,
  socialAuth: SocialAuthReducer,
  profiles: fetchProfilesReducers,
  searchedProfile: specificProfileReducer,
  resetPassword: resetPasswordReducer,
  updatePassword: updatePasswordReducer,
  article: ArticlesReducer,
  getAll: getAllArticlesReducer,
});
