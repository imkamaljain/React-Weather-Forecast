import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function Input({ getWeatherData, cities }) {
    const [search, setSearch] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const onInput = value => {
        setSearch(value);
        let filteredCitiesData = [];
        cities.forEach(item => {
            item.cities.forEach((x) => {
                if (x.toLowerCase().startsWith(value.toLowerCase()))
                    filteredCitiesData.push({ city: x, country: item.country, countryCode: item.Iso2, flag: item.flag })
            })
        });
        setFilteredCities(filteredCitiesData);
    };
    const onCitySelect = value => {
        setSearch(typeof value == "string" ? value : value.city);  
        setFilteredCities([]); 
        getWeatherData(value);
    };

    return (
        <div className="inputContainer">
            <div className="header">
                <img alt="" onClick={() => window.location.reload()}></img>
            </div>
            <div className="inputWrapper">
                <div className="searchContainer">
                    <input type="text" name="city" value={search} placeholder="City" autoComplete="off" 
                        onChange={event => onInput(event.target.value)} 
                        onKeyPress={event => event.key === 'Enter' ? onCitySelect(event.target.value) : null}
                        onFocus={event => onInput(event.target.value)}
                        onBlur={() => setTimeout(() => setFilteredCities([]), 250)}
                    />
                    <button onClick={() => onCitySelect(search)}><BiSearchAlt2 /></button>
                </div>
                {search.length > 1 && filteredCities.length > 0 && (
                    <ul>
                        {filteredCities.map(item => (
                            <li onClick={() => onCitySelect(item)}>{`${item.city}, ${item.country} `}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}