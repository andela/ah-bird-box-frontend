import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      transitionIn="bounceIn"
      transitionOut="bounceOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById('root'),
);
