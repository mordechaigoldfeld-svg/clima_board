import { useNavigate } from "react-router"
import SearchBar from "../../components/searchBar/SearchBar"
import type { baseCityType } from "../../types/cityType"



export default function Search() {

  const navigate =useNavigate()

  const handleSelectCity = (city:baseCityType)=>{
  navigate(`/cityDetails/${city.name}/${city.latitude}/${city.longitude}/${city.country}`)
  }

  return (
    <div>
      <h1>chose a city</h1>
      <SearchBar onSelect={handleSelectCity}/>
    </div>
  )
}
