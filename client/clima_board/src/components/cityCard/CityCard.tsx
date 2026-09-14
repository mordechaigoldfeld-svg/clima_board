import React from 'react'
import type { baseCityType } from '../../types/cityType.ts'
import './CityCard.css'

type currentType = {

    temperature_2m:number,
    wind_speed_10m:number,
    weather_code:number,
    apparent_temperature:number
}

interface cityProps {
    city: baseCityType,
    current: currentType,
    isFav?:boolean,
    onToggleFav?:()=>void

}



// city
// : 
// {name: 'Jerusalem', country: 'Israel', latitude: 31.76904, longitude: 31.76904}
// current
// : 
// {time: '2026-09-14T07:15', interval: 900, temperature_2m: 27.6, wind_speed_10m: 7.6, apparent_temperature: 32.4, …}


export default function CityCard(city: cityProps) {

    const {name,country} = city.city
    const{temperature_2m,wind_speed_10m,weather_code,apparent_temperature} = city.current

    return (
        <div>
            <div className="weather-card">
                <h2 className='name'>{name}, {country}</h2>
                <p><strong>Temperature:</strong> {temperature_2m}°C</p>

                <p><strong>Wind Speed:</strong> {wind_speed_10m} km/h</p>

                <p><strong>Weather Code:</strong> {weather_code}</p>
                <p><strong>apparent temperature:</strong> {apparent_temperature}</p>
                {city.onToggleFav && (

                <button className='fav-btn' onClick={city.onToggleFav}>
                    {city.isFav? "remove from favorite ❤️":"add to favorite 🤍"}</button>
                )}
            </div>
        </div>
    )
}
