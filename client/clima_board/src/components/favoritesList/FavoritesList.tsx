import { useEffect, useState } from "react"
import { getByName, deleteFavorite } from "../../api/api"
import Spinner from "../spinner/Spinner"
import './FavoritesList.css'


export default function FavoritesList() {

    const explorer_name = localStorage.getItem('explorer_name')
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadFavorites = async () => {
        if (!explorer_name) return

        try {
            setLoading(true)
            setError(null)
            const favs = await getByName(explorer_name)
            setFavorites(favs || [])

        } catch (error: any) {
            if (error.response?.status === 404) {
                setFavorites([])
            }else {
                setError(`favorites error ${error}`)
            }
        } finally {
            setLoading(false)
        }
    }

        useEffect(() => {

            loadFavorites()

        }, [explorer_name])
        const handleDelete = async (id: string) => {
            try {
                await deleteFavorite(id)
                setFavorites((prev) => prev.filter((item) => (item.id) !== id))
            } catch (err) {
                console.error("Failed to delete favorite:", err)
            }
        }

        if (loading) return <div><Spinner /> Loading your favorites...</div>
        if (error) return <p style={{ color: "red" }}>{error}</p>

        if (!loading && favorites.length === 0) {
            return <p>No favorite cities added yet.</p>
        }

        return (
           <div className="favorites-container">
      <h2>Your Saved Cities</h2>
      <ul>
        {favorites.map((f: any) => {
          const id = f.id
          const cityName = f.city_name

          return (
            <li className="li"
              key={id}
              
            >
              <span>📍 <strong>{cityName}</strong>, {f.country}</span>
              <button className="delButton"
                onClick={() => handleDelete(id)}
     
              >
                Delete 🗑️
              </button>
            </li>
          )
        })}
      </ul>
    </div>
        )
    }
