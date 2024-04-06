import React, { useState } from 'react'
import '../styles/historySidebar.css'

const HistorySidebar = ({ showHistory, setShowHistory }) => {
  const [calculationHistory, setCalculationHistory] = useState(
    JSON.parse(localStorage.getItem('Calculation'))
  )
  const clearHistory = () => {
    localStorage.removeItem('Calculation')
    setCalculationHistory(null)
  }

  return (
    <>
      <div className="sidebar">
        <div className="history-title">
          <h1>History</h1>
        </div>
        {calculationHistory ? (
          calculationHistory.map((cal) => {
            return (
              <div className="history-entries">
                <div>{cal.eq}</div>
                <div className="history-res">= {cal.res}</div>
              </div>
            )
          })
        ) : (
          <div className="no-history">No history yet</div>
        )}
      </div>
      {calculationHistory && (
        <button
          type="button"
          onClick={() => clearHistory()}
          className="clear-history-btn"
        >
          Clear history
        </button>
      )}
    </>
  )
}

export default HistorySidebar
