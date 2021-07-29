import React from 'react';

export default function Weather({ weatherData }) {
    const { location, currentTemp, currentStats, byHour, next5Days } = weatherData;

    return (
        Object.keys(weatherData).length > 0
            ? (
                <div className="weatherContainer">
                    <div className="location-and-date">
                        <div>
                            <h1>{`${location.city}, ${location.country}`}</h1>
                            {
                                location.flag
                                    ? <img src={location.flag}></img>
                                    : null
                            }
                        </div>
                        <div>{location.date}</div>
                    </div>
                    <div className="current-temp">
                        <div className="current-temp-icon-container">
                            <i className={'wi ' + getWeatherTypeIconClass(currentTemp.weatherType)}></i>
                        </div>
                        <div className="current-temp-content-container">
                            <div className="current-temp-value">{currentTemp.temp}&deg;</div>
                            <div className="current-temp-summary">{currentTemp.desc}</div>
                        </div>
                    </div>
                    <div className="current-stats">
                        <div>
                            <div className="value">{currentStats.minTemp}&deg;</div>
                            <div className="label">Low <i className="wi wi-direction-down"></i></div>
                            <div className="value">{currentStats.maxTemp}&deg;</div>
                            <div className="label">High <i className="wi wi-direction-up"></i></div>
                        </div>
                        <div>
                            <div className="value">{currentStats.wind}m/s</div>
                            <div className="label">Wind <i className="wi wi-windy"></i></div>
                            <div className="value">{currentStats.humidity}%</div>
                            <div className="label">Humidity <i className="wi wi-humidity"></i></div>
                        </div>
                        <div>
                            <div className="value">{currentStats.sunrise}</div>
                            <div className="label">Sunrise <i className="wi wi-sunrise"></i></div>
                            <div className="value">{currentStats.sunset}</div>
                            <div className="label">Sunset <i className="wi wi-sunset"></i></div>
                        </div>
                    </div>
                    <div className="weather-by-hour">
                        <h2>Current weather by hour</h2>
                        <div className="weather-by-hour-container">
                            {
                                byHour.map((data) => {
                                    return <div className="weather-by-hour-item">
                                        <div>{data.time}</div>
                                        <i className={'wi ' + getWeatherTypeIconClass(data.weatherType)}></i>
                                        <div>{data.desc}</div>
                                        <div>{data.temp}&deg;</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="next-5-days">
                        <h2>Next 5 days forecast</h2>
                        <div className="next-5-days-container">
                            {
                                next5Days.map((data) => {
                                    return <div className="next-5-days-row">
                                        <div className="value">{data.day}
                                            <div className="label">{data.date}</div>
                                        </div>
                                        <div className="value">{data.minTemp}&deg;
                                            <div className="label">Low <i className="wi wi-direction-down"></i></div>
                                        </div>
                                        <div className="value">{data.maxTemp}&deg;
                                            <div className="label">High <i className="wi wi-direction-up"></i></div>
                                        </div>
                                        <div className="value">
                                            <i className={'wi ' + getWeatherTypeIconClass(data.weatherType)}></i>
                                        </div>
                                        <div className="value">{data.humidity}%
                                            <div className="label">Humidity <i className="wi wi-humidity"></i></div>
                                        </div>
                                        <div className="value">{data.wind}m/s
                                            <div className="label">Wind <i className="wi wi-windy"></i></div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>)
            : null
    )
}

const getWeatherTypeIconClass = weatherType => {
    if (weatherType === 'Thunderstorm') return 'wi-thunderstorm';
    if (weatherType === 'Drizzle') return 'wi-sprinkle';
    if (weatherType === 'Rain') return 'wi-rain';
    if (weatherType === 'Snow') return 'wi-snow';
    if (weatherType === 'Mist') return 'wi-smog';
    if (weatherType === 'Smoke') return 'wi-smoke';
    if (weatherType === 'Haze') return 'wi-day-haze';
    if (weatherType === 'Dust') return 'wi-dust';
    if (weatherType === 'Fog') return 'wi-fog';
    if (weatherType === 'Sand') return 'wi-sandstorm';
    if (weatherType === 'Tornado') return 'wi-tornado';
    if (weatherType === 'Clear') return 'wi-day-sunny';
    if (weatherType === 'Clouds') return 'wi-cloudy';
    return 'wi-na';
};