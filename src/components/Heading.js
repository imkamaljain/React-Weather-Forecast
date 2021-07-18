import React from 'react';

export default function Heading({ city, countryCode }) {
    return (
        <div className="headingContainer">
            {
                city && countryCode
                    ? (<h1>Showing 5 day weather forecast for {city}, {countryCode}</h1>)
                    : (<h1>Enter a city to get the 5 day weather forecast</h1>)
            }
        </div>
    )
}