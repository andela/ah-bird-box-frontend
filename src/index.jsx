import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './reducers';

import App from './App';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      timeOut={10000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    <App />
  </Provider>,
  document.getElementById('root'),
);

export default {
  profileReducer: {
    profile: {},
  },
  profiles: {
    users: [],
  },
  searchedProfile: {
    user: {},
  },
};
