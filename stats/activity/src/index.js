import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

export const init = config => {
  ReactDOM.render(<App config={config} />, document.getElementById(config.id));
}