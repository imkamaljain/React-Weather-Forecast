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
                            <img src={location.flag}></img>
                        </div>
                        <div>{location.date}</div>
                    </div>
                    <div className="current-temp">
                        <div className="current-temp-icon-container">
                            <img src={currentTemp.imgSrc} alt=""></img>
                        </div>
                        <div className="current-temp-content-container">
                            <div className="current-temp-value">{currentTemp.temp}&deg;</div>
                            <div className="current-temp-summary">{currentTemp.desc}</div>
                        </div>
                    </div>
                    <div className="current-stats">
                        <div>
                            <div className="value">{currentStats.minTemp}&deg;</div>
                            <div className="label">Low</div>
                            <div className="value">{currentStats.maxTemp}&deg;</div>
                            <div className="label">High</div>
                        </div>
                        <div>
                            <div className="value">{currentStats.wind}m/s</div>
                            <div className="label">Wind</div>
                            <div className="value">{currentStats.humidity}%</div>
                            <div className="label">Humidity</div>
                        </div>
                        <div>
                            <div className="value">{currentStats.sunrise}</div>
                            <div className="label">Sunrise</div>
                            <div className="value">{currentStats.sunset}</div>
                            <div className="label">Sunset</div>
                        </div>
                    </div>
                    <div className="weather-by-hour">
                        <h2>Current weather by hour</h2>
                        <div className="weather-by-hour-container">
                            {
                                byHour.map((data) => {
                                    return <div className="weather-by-hour-item">
                                        <div>{data.time}</div>
                                        <img src={data.imgSrc} alt=""></img>
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
                                            <div className="label">Low</div>
                                        </div>
                                        <div className="value">{data.maxTemp}&deg;
                                            <div className="label">High</div>
                                        </div>
                                        <div className="value">
                                            <img src={data.imgSrc} alt={data.desc}></img>
                                        </div>
                                        <div className="value">{data.humidity}%
                                            <div className="label">Humidity</div>
                                        </div>
                                        <div className="value">{data.wind}m/s
                                            <div className="label">Wind</div>
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