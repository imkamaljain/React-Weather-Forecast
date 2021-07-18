import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function Input({ getWeather }) {
    return (
        <div className="inputContainer">
            <form onSubmit={getWeather}>
                <input type="text" name="city" placeholder="City" />
                <button type="submit"><BiSearchAlt2 /></button>
            </form>
        </div>
    )
}