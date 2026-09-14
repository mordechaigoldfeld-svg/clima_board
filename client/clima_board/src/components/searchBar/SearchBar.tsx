import React, { useEffect, useState, useRef } from 'react'
import { getCityService } from '../../service/weatherService'
import type { baseCityType } from '../../types/cityType'



interface searchProps {

    onSelect: (city: baseCityType) => void 

}




export default function SearchBar({ onSelect }: searchProps) {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [searchCity, setSearchCity] = useState('')
    const [results, setResults] = useState([])

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])
    const handlleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        const query = searchCity.trim()

        if (!query) {
            setError('cannot found empty city')
            return
        }

        try {
            setLoading(true)
            setError(null)
            setResults([])

            const cities = await getCityService(query)

            if (cities.length === 0) {
                setError('city not found')
                return
            }
            setResults(cities)


        } catch (error) {
            setError(`Failed to load weather data: ${error}`)
        } finally {
            setLoading(false)
        }


    }
    return (
        <div className='search_bar_container'>

            <form onSubmit={handlleSearch}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder='enter a city...'
                    value={searchCity}
                    onChange={(e) => {
                        setSearchCity(e.target.value)
                        if (error) setError(null)
                    }} />
                <button type='submit'>
                    {loading ? "loading..." : "find"}
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

            {results.length > 0 && (
                <ul>
                    {
                        results.map((item) => (
                            <li key={item.latitude - item.longitude}>
                                <span>📍 {item.name} {`(${item.country})`}</span>
                                <button onClick={() => {
                                    onSelect(item)
                                    setResults([])
                                    setSearchCity('')
                                }}>find</button>
                            </li>
                        ))
                    }
                </ul>
            )}

        </div>
    )
}


