import { Link, useNavigate } from "react-router"
import "./Dashboard.css"
import { getCities, getCurrentWeather } from "../../api/api"
import { useState, useEffect } from "react"
import Spinner from "../../components/spinner/Spinner"
import { getCityService, getWeatherForCityService } from "../../service/weatherService"
import CityCard from "../../components/cityCard/CityCard"













export default function Dashboard() {
  const explorer_name = localStorage.getItem('explorer_name')
  const navigate = useNavigate()

  const [city, setCity] = useState<any>(null)
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriteId, setFavoriteId] = useState<string | null>(null)


  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        setError(null)

        const citiesResponse = await getCityService('jerusalem')


        if (citiesResponse.length === 0) {
          setError("City not found")
          return
        }

        const defaultCity = citiesResponse[0]

        setCity(defaultCity)

        const weatherResponse = await getWeatherForCityService(defaultCity)
        setWeather(weatherResponse)

      } catch (err) {
        setError(`Failed to load weather data: ${err}`)
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
        {loading && <span><Spinner /> Loading weather for Jerusalem...</span>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && city && weather && (
          <CityCard city={city} current={weather.current} />
        )}
      </div>

      <div className="navigation-actions">
        <button className="click" onClick={() => navigate('/search')}>to search</button>
        <button className="click" onClick={() => navigate('/compare')}>to compare</button>
        <button className="click" onClick={() => navigate('/favorites')}>to favorites</button>
      </div>
    </div>
  )
}