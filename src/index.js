import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export { default as Input } from './components/Input';
export { default as Weather } from './components/Weather';
export { default as Footer } from './components/Footer';
export { default as Loader } from './components/Loader';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);