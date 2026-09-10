import { Link, useNavigate } from "react-router"
import "./Dashboard.css"
import { getCities, getCurrentWeather } from "../../api/api"
import { useState, useEffect } from "react"


export default function Dashboard() {
  const explorer_name = localStorage.getItem('explorer_name')
  const navigate = useNavigate()

  const [city, setCity] = useState<any>(null)
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        setError(null)

        const citiesResponse = await getCities('jerusalem')
        
        if (!citiesResponse?.results || citiesResponse.results.length === 0) {
          setError("City not found")
          return
        }

        const defaultCity = citiesResponse.results[0]
        setCity(defaultCity)

        const weatherResponse = await getCurrentWeather(
          defaultCity.latitude,
          defaultCity.longitude
        )
        setWeather(weatherResponse)

      } catch (err) {
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="dashboard-container">
      <div>
        <h1>Welcome, {explorer_name}!</h1>
      </div>

      <div className="weather-section">
        {loading && <p>Loading weather for Jerusalem...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && city && weather && (
          <div className="weather-card">
            <h2>{city.name}, {city.country}</h2>
            <p><strong>Temperature:</strong> {weather.current.temperature_2m}°C</p>
            
              <p><strong>Wind Speed:</strong> {weather.current.wind_speed_10m} km/h</p>
            
              <p><strong>Weather Code:</strong> {weather.current.weather_code}</p>
              <p><strong>apparent temperature:</strong> {weather.current.apparent_temperature}</p>
            
          </div>
        )}
      </div>

      <div className="navigation-actions">
        <button onClick={() => navigate('/search')}>to search</button>
        <button onClick={() => navigate('/compare')}>to compare</button>
        <button onClick={() => navigate('/favorites')}>to favorites</button>
      </div>
    </div>
  )
}