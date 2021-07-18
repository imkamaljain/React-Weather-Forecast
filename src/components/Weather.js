import React from 'react';

export default function Weather({ forecast }) {
    return (
        forecast
            ? (
                <div className="weatherContainer">
                    {
                        forecast.map((data) => {
                            return <div>
                                <img src={data.image} />
                                <span>{`${data.date}, ${data.description}`}</span>
                                <span>{`${data.minTemp}°C / ${data.maxTemp}°C`}</span>
                            </div>;
                        })
                    }
                </div>
            )
            : null
    )
}