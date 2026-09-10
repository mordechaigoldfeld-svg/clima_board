import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Welcome() {

    const [inputName, setInputName] = useState("")
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleClick = () => {


        if (inputName.trim() === "") {

            setError('invalid name')
            return
        }
        if (inputName.length < 2 || inputName.length > 30) {

            setError('name must to be 2-30 charters')
            return
        }


        localStorage.setItem('explorer_name', inputName);
        navigate('/dashboard')
    }

    return (
        <div>
            <h1>welcome to clima board!!!</h1>
            <div>

                {/* <label htmlFor="explorer_name">name</label> */}
                <input
                    id='explorer_name'
                    type="text"
                    placeholder='enter your name'
                    value={inputName} onChange={(e) => {
                        setInputName(e.target.value)
                        if (error) setError(null)
                    }} />

                <button type='button' onClick={() => handleClick()}>enter</button>
                {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
            </div>
        </div>
    )
}








