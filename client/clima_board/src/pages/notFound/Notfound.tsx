import React from 'react'
import { useNavigate } from 'react-router'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        {/* אייקון ענן וערפל בעיצוב מזג אוויר */}
        <div className="weather-icon-404">
          <span className="cloud">☁️</span>
          <span className="sun-behind">🌤️</span>
        </div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Lost in the Fog?</h2>
        <p className="not-found-text">
          We couldn't find the coordinates or weather forecast for this location. 
          The page you are looking for might have vanished into thin air.
        </p>

        <div className="not-found-actions">
          <button 
            className="not-found-btn primary" 
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard 🏠
          </button>
          <button 
            className="not-found-btn secondary" 
            onClick={() => navigate('/search')}
          >
            Search Cities 🔍
          </button>
        </div>
      </div>
    </div>
  )
}
