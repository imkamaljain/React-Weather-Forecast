import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export { default as Heading } from './components/Heading';
export { default as Input } from './components/Input';
export { default as Weather } from './components/Weather';
export { default as Footer } from './components/Footer';

export { default as Clear } from './assets/clear.jpg';
export { default as Thunderstorm } from './assets/thunderstorm.jpg';
export { default as Drizzle } from './assets/drizzle.jpg';
export { default as Rain } from './assets/rain.jpg';
export { default as Snow } from './assets/snow.jpg';
export { default as Atmosphere } from './assets/atmosphere.jpg';
export { default as Clouds } from './assets/clouds.jpg';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);