import React, { useState, useEffect } from 'react';
import { Input, Weather, Footer, Loader } from './index';
import FormatUtils from './utils/FormatUtils';
import './App.css';
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;
const formatUtils = new FormatUtils();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');
  const [cities, setCities] = useState([]);
  const [themeMode, setThemeMode] = useState('light');
  const [theme, setTheme] = useState({
    backgroundImage: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
    color: '#000'
  });

  useEffect(() => {
    setWeatherData({});;
    setError('');
  }, [error]);

  useEffect(() => {
    const getCities = getData('Get', 'https://countriesnow.space/api/v0.1/countries');
    const getIsoCodes = getData('Get', 'https://countriesnow.space/api/v0.1/countries/iso');
    const getFlags = getData('Get', 'https://countriesnow.space/api/v0.1/countries/flag/images'); 
    Promise.all([getCities, getIsoCodes, getFlags])
      .then(response => {
        let citiesArray = JSON.parse(response[0]).data;
        let isoCodesArray = JSON.parse(response[1]).data;
        let flagsArray = JSON.parse(response[2]).data;
        let isoCodesWithFlagsArray = [];
        for (let i = 0; i < isoCodesArray.length; i++) {
          isoCodesWithFlagsArray.push({
            ...isoCodesArray[i],
            ...(flagsArray.find((item) => item.name === isoCodesArray[i].name))
          });
        }
        const citiesData = []
        for (let i = 0; i < isoCodesWithFlagsArray.length; i++) {
          citiesData.push({
            ...citiesArray[i],
            ...(isoCodesWithFlagsArray.find((item) => item.name === citiesArray[i].country))
          }
          );
        }
        setCities(citiesData);
        setLoading(false);
      })
      .catch(response => { 
        setLoading(false);
      });
  }, []);

  const getWeatherData = async (param) => {
    setLoading(true);
    const queryParam = typeof param == "string" ? param : `${param.city},${param.countryCode}`;
    getData('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${queryParam}&units=metric&APPID=${API_KEY}`)
      .then(response => {
        response = JSON.parse(response);
        let byHour = [], currDt = response.list[0].dt_txt.substr(8, 2), next5Days = [];
        for (let i = 0; i < 6; i++) {
          byHour.push({
            'time': formatUtils.getDisplayTime(response.list[i].dt_txt),
            'temp': Math.round(response.list[i].main.temp),
            'desc': formatUtils.capitalizeFirstLetters(response.list[i].weather[0].description),
            'weatherType': response.list[i].weather[0].main
          });
        }
        for (let i = 0; i < response.list.length; i++) {
          if (currDt === response.list[i].dt_txt.substr(8, 2)) continue;
          currDt = response.list[i].dt_txt.substr(8, 2);
          next5Days.push({
            'day': formatUtils.getDay(response.list[i].dt_txt).substr(0, 3),
            'date': formatUtils.getShortDate(response.list[i].dt_txt),
            'desc': formatUtils.capitalizeFirstLetters(response.list[i].weather[0].description),
            'weatherType': response.list[i].weather[0].main,
            'minTemp': Math.floor(response.list[i].main.temp_min),
            'maxTemp': Math.ceil(response.list[i].main.temp_max),
            'humidity': response.list[i].main.humidity,
            'wind': response.list[i].wind.speed
          });
        }
        if (typeof param === "string") {
          param = {
            'city': formatUtils.capitalizeFirstLetters(param)
          };
          const index = cities.findIndex(record => record.Iso2 === response.city.country);
          if (index !== -1) {
            param.country = cities[index].country;
            param.flag = cities[index].flag;
          }
        }
        const weatherData = {
          'location': {
            'city': param.city,
            'country': param.country,
            'flag': param.flag,
            'date': formatUtils.getformattedTodayDate()
          },
          'currentTemp': {
            'temp': Math.round(response.list[0].main.temp),
            'desc': formatUtils.capitalizeFirstLetters(response.list[0].weather[0].description),
            'weatherType': response.list[0].weather[0].main
          },
          'currentStats': {
            'minTemp': Math.floor(response.list[0].main.temp_min),
            'maxTemp': Math.ceil(response.list[0].main.temp_max),
            'wind': response.list[0].wind.speed,
            'humidity': response.list[0].main.humidity,
            'sunrise': formatUtils.getTimeFromTimeStamp(response.city.sunrise),
            'sunset': formatUtils.getTimeFromTimeStamp(response.city.sunset)
          },
          'byHour': byHour,
          'next5Days': next5Days
        };
        setWeatherData(weatherData);
        setLoading(false);
      })
      .catch(response => {
        const err = response ? JSON.parse(response).message : response.statusText;
        setLoading(false);
        setError(err);
        alert(err);
      });
  };

  const changeTheme = (mode) => {
    setThemeMode(mode);
    if (mode === 'dark') {
      setTheme({
        background: '#000',
        color: '#fff'
      });
    } else {
      setTheme({
        backgroundImage: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)',
        color: '#000'
      });
    }
  };

  return (
    loading
      ? <Loader />
      : (
        <div className="container" style={theme}>
          <div className="mainContainer">
            <Input getWeatherData={getWeatherData} cities={cities} themeMode={themeMode} changeTheme={changeTheme} />
            <Weather weatherData={weatherData} />
          </div>
          <Footer iconColor={theme.color}/>
        </div>)
  );
}

const getData = (method, url) => {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = function () {
      if (request.status === 200) {
        setTimeout(() => resolve(request.response), 2000);
      } else {
        reject(request.response ?? request);
      }
    };
    request.onerror = function () {
      reject(Error("error"));
    };
    request.send();
  });
};