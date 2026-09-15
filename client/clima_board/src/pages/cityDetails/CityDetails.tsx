import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CityCard from '../../components/cityCard/CityCard'
import { getPrevisionService, getWeatherForCityService } from '../../service/weatherService'
import Spinner from '../../components/spinner/Spinner'
import type { baseCityType } from '../../types/cityType'
import { deleteFavorite, getByName, insertNewFavorite } from '../../api/api'
import ForecastView from '../../components/forecatsView/ForecastView'



export default function CityDetails() {

    const { name, latitude, longitude, country } = useParams()

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    const [weather, setWeather] = useState<any>('')

    const [favoriteId, setFavoriteId] = useState<string | null>(null)

    const city: baseCityType = {
        name: name || '',
        latitude: Number(latitude),
        longitude: Number(longitude),
        country: country || ''
    }

    const explorer_name = localStorage.getItem('explorer_name')

    useEffect(() => {

        const weatherResponse = async () => {

            try {

                setLoading(true)
                setError(null)

                const resWeather = await getWeatherForCityService(city)
                setWeather(resWeather)

                if (explorer_name) {
                    let userFavs = []
                    try {
                        userFavs = await getByName(explorer_name)

                    } catch (favError: any) {
                        if (favError.response?.status === 404) {
                            userFavs = []
                        } else {
                            console.error("Error fetching favorites:", favError)
                        }
                    }

                    const existing = userFavs.find((f: any) =>
                        f.city_name.toLowerCase() === name?.toLowerCase() &&
                        f.country?.toLowerCase() === country?.toLowerCase()
                    )

                    if (existing) {
                        setFavoriteId(existing.id)
                    } else {
                        setFavoriteId(null)
                    }
                }

            } catch (error) {
                setError(`Failed to load weather data: ${error}`)
            } finally {
                setLoading(false)
            }
        }

        weatherResponse()
    }, [name, latitude, longitude, country])



    const handleTogleFav = async () => {

        try {
            if (favoriteId) {
                await deleteFavorite(favoriteId)
                setFavoriteId(null)
            } else {
                const newFav = await insertNewFavorite({
                    explorer_name,
                    city_name: city.name,
                    country: city.country,
                    lat: city.latitude,
                    long: city.longitude,
                })
                console.log("Server response on insert:", newFav)

                const updatedList = await getByName(explorer_name)


                const found = updatedList.find((f: any) =>
                    (f.city_name?.toLowerCase() === city.name.toLowerCase() || f.name?.toLowerCase() === city.name.toLowerCase()) &&
                    f.country?.toLowerCase() === city.country?.toLowerCase()
                )
                if (found) {

                    setFavoriteId(String(found.id || found._id))
                }

            }
        } catch (err) {
            console.error("Failed to update favorite:", err)
        }
    }


    return (
        <div className='details-container'>

            <div className="weather-section">
                {loading && <span><Spinner /> Loading weather for Jerusalem...</span>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && city && weather && (
                    <>
                    <CityCard onToggleFav={handleTogleFav} city={city} current={weather.current} isFav={Boolean(favoriteId)} />
                    <ForecastView city={city} />
                    </>
                )}
            </div>
        </div>
    )
}
