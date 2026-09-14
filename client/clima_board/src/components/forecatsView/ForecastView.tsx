import React, { useState } from 'react'
import { getPrevisionService } from '../../service/weatherService'
import Spinner from '../spinner/Spinner'
import type { baseCityType } from '../../types/cityType'
import './ForecastView.css'

interface ForecastProps {
  city: baseCityType
}

type ForecastData = {
  time: string[]
  temperature_2m_mean: number[]
  apparent_temperature_mean: number[]
  wind_speed_10m_mean: number[]
  weather_code: number[]
}

export default function ForecastView({ city }: ForecastProps) {
  const [days, setDays] = useState<number>(5)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchForecast = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await getPrevisionService(city, days)
      const daily = res.prevision  || res

      if (!daily?.time) {
        throw new Error('Invalid forecast data structure')
      }

      setForecastData(daily)
    } catch (err: any) {
      setError(`Failed to fetch forecast: ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="forecast-wrapper">
      <div className="forecast-controls">
        <select 
          className="forecast-select"
          value={days} 
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={3}>3 Days</option>
          <option value={5}>5 Days</option>
          <option value={7}>7 Days</option>
          <option value={10}>10 Days</option>
          <option value={14}>14 Days</option>
          <option value={16}>16 Days</option>
        </select>

        <button 
          className="forecast-btn"
          onClick={handleFetchForecast}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Show Forecast 📅'}
        </button>
      </div>

      {loading && (
        <div className="forecast-status">
          <Spinner /> Loading forecast...
        </div>
      )}

      {error && <p className="forecast-error">{error}</p>}

      {forecastData && (
        <div className="forecast-cards-grid">
          {forecastData.time.map((date: string, index: number) => (
            <div key={date} className="forecast-day-card">
              <div className="forecast-date">{date}</div>
              <p className="forecast-temp">
                <strong>Temp:</strong> {forecastData.temperature_2m_mean[index]}°C
              </p>
              <p className="forecast-apparent">
                <strong>Feels like:</strong> {forecastData.apparent_temperature_mean[index]}°C
              </p>
              <p className="forecast-wind">
                <strong>Wind:</strong> {forecastData.wind_speed_10m_mean[index]} km/h
              </p>
              <p className="forecast-code">
                <strong>Code:</strong> {forecastData.weather_code[index]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}