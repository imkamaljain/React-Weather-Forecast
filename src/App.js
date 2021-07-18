import React, { useState, useEffect } from 'react';
import { Heading, Input, Weather, Footer } from './index';
import './App.css';
import { Clear, Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clouds } from './index';
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;

export default function App() {
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [forecast, setForecast] = useState([]);
  const [bgImage, setBgImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setCity('');
    setCountryCode('');
    setForecast([]);
    setBgImage('');
    setError('');
  }, [error]);

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city === '') return;
    getData(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`)
      .then(response => {
        response = JSON.parse(response);
        const weatherData = [];
        for (let i = 0; i <= 32; i += 8) {
          weatherData.push({
            minTemp: Math.floor(response.list[i].main.temp_min),
            maxTemp: Math.floor(response.list[i].main.temp_max),
            description: capitalizeFirstLetter(response.list[i].weather[0].description),
            date: new Date(response.list[i].dt_txt).toLocaleDateString('en-IN'),
            image: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`
          })
        }
        const bgImg = getBackgroundImageBasedOnWeatherCode(response.list[0].weather[0].id);
        setBgImage(bgImg);
        setCity(response.city.name);
        setCountryCode(response.city.country);
        setForecast(weatherData);
      })
      .catch(error => {
        setError(error);
        alert(error);
      });
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="mainContainer">
        <Heading city={city} countryCode={countryCode} />
        <Input getWeather={getWeather} />
        <Weather forecast={forecast} />
      </div>
      <Footer />
    </div>
  );
}

const getData = (url) => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response ? JSON.parse(request.response).message : request.statusText);
      }
    };
    request.onerror = function () {
      reject(Error("error"));
    };
    request.send();
  });
};

const capitalizeFirstLetter = s => s && s[0].toUpperCase() + s.slice(1);

const getBackgroundImageBasedOnWeatherCode = id => {
  if (id === 800) return Clear;
  return {
    2: Thunderstorm,
    3: Drizzle,
    5: Rain,
    6: Snow,
    7: Atmosphere,
    8: Clouds
  }[String(id)[0]];
};