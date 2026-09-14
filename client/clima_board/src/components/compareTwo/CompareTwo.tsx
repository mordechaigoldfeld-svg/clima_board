import SearchBar from "../searchBar/SearchBar"
import { useState } from "react"
import CityCard from "../cityCard/CityCard"
import { getWeatherForCityService } from "../../service/weatherService"
import Spinner from "../spinner/Spinner"
import type { baseCityType } from "../../types/cityType"
import './CompareTwo.css'



export default function CompareTwo() {
  const [cityOne, setCityOne] = useState<baseCityType | null>(null)
  const [weatherOne, setWeatherOne] = useState<any>(null)

  const [cityTwo, setCityTwo] = useState<baseCityType | null>(null)
  const [weatherTwo, setWeatherTwo] = useState<any>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const handleSelectCity = async (selectedCity: baseCityType) => {
    try {
      setLoading(true)
      setError(null)

      const weatherData = await getWeatherForCityService(selectedCity)

      if (!cityOne) {
        setCityOne(selectedCity)
        setWeatherOne(weatherData)
      } else if (!cityTwo) {
        setCityTwo(selectedCity)
        setWeatherTwo(weatherData)
      }
    } catch (err) {
      setError(`Failed to load weather: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setCityOne(null)
    setWeatherOne(null)
    setCityTwo(null)
    setWeatherTwo(null)
    setError(null)
  }

  return (
    <div className="compare-container">
      <h1>Compare Cities Weather</h1>

      {(!cityOne || !cityTwo) && (
        <div>
          <h3>
            {!cityOne ? "1. Select First City:" : "2. Select Second City to Compare:"}
          </h3>
          <SearchBar onSelect={handleSelectCity} />
        </div>
      )}

      {loading && <div><Spinner /> Loading weather data...</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      {(cityOne || cityTwo) && (
        <button onClick={handleReset}>
          Reset Comparison 🔄
        </button>
      )}

      <div className="two_cities">
        {cityOne && weatherOne && (
          <div>
            <h3>City 1</h3>
            <CityCard city={cityOne} current={weatherOne.current} />
          </div>
        )}

        {cityTwo && weatherTwo && (
          <div>
            <h3>City 2</h3>
            <CityCard city={cityTwo} current={weatherTwo.current} />
          </div>
        )}
      </div>

     
      {weatherOne && weatherTwo && (
        <div>
          <h3>
            Difference: {Math.abs(weatherOne.current.temperature_2m - weatherTwo.current.temperature_2m).toFixed(1)}°C
          </h3>
        </div>
      )}
    </div>
  )
}