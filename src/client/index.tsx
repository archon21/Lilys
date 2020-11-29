import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import App from './App';
import { Router } from 'react-router-dom';
import history from './history';
// import reportWebVitals from './reportWebVitals';

declare global {
  interface Window {
    __STATE__: any;
  }
}

console.log(window.__STATE__);
ReactDOM.hydrate(
  <Router history={history}>
    <React.Fragment>
      <App defaultState={window.__STATE__} />
    </React.Fragment>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
