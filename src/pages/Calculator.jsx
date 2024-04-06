import React, { useState, useEffect } from 'react'
import HistorySidebar from '../components/HistorySidebar'
import Hamburgor from '../assets/icons/Hamburgor'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [isequalPressed, setIsequalPressed] = useState(false)

  const isOperator = (value) => {
    if (['+', '-', '*', '/'].includes(value)) return true
  }

  const inputNum = (value) => {
    if (input.length === 0 && isOperator(value)) {
      return
    }
    if (isequalPressed) {
      if (isOperator(value)) {
        setInput((prev) => prev + value)
      } else {
        setInput(value)
      }
      setIsequalPressed(false)
      return
    }
    setInput((prev) => prev + value)
  }

  const calculateResult = () => {
    if (isOperator(input[input.length - 1])) {
      return
    }
    let calculations = JSON.parse(localStorage.getItem('Calculation')) || []
    calculations.push({ eq: input, res: eval(input).toString() })
    localStorage.setItem('Calculation', JSON.stringify(calculations))
    setInput(eval(input).toString())
    setIsequalPressed(true)
  }

  const handleClear = () => {
    setInput('')
  }

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1))
  }

  const handleClearEnd = () => {
    if (isOperator(input[input.length - 1])) {
      return
    }
    setInput((prev) => {
      const lastOperatorIndex = prev
        .split('')
        .reverse()
        .findIndex((char) => /[+\-*/]/.test(char))
      const newInput =
        lastOperatorIndex > 0 ? prev.slice(0, -lastOperatorIndex) : ''
      return newInput
    })
  }

  const handleKey = (key) => {
    switch (key) {
      case 'Backspace':
        handleBackspace()
        break
      case 'Delete':
        handleClearEnd()
        break
      case '=':
      case 'Enter':
        calculateResult()
        break
      default:
        if (/[0-9./*\-+]/.test(key)) {
          inputNum(key)
        }
        break
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event
      if (/[0-9./*\-+=]|Enter|Backspace|Delete/.test(key)) {
        event.preventDefault()
        handleKey(key)
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [input])

  return (
    <>
      <div>
        {showHistory && (
          <HistorySidebar
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
        )}
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className={`hamburgar ${showHistory && 'hamburgor-hide'}`}
        >
          <Hamburgor />
        </button>
      </div>
      <div className="container">
        <div className="display">{input || 0}</div>
        <div className="calculator">
          <div className="row">
            <button
              className="btn"
              type="button"
              onClick={() => handleClearEnd()}
            >
              CE
            </button>
            <button className="btn" type="button" onClick={() => handleClear()}>
              C
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => handleBackspace()}
            >
              ←
            </button>
            <button
              className="btn operator"
              type="button"
              onClick={() => inputNum('/')}
            >
              ÷
            </button>
          </div>
          <div className="row">
            <button className="btn" type="button" onClick={() => inputNum('7')}>
              7
            </button>
            <button className="btn" type="button" onClick={() => inputNum('8')}>
              8
            </button>
            <button className="btn" type="button" onClick={() => inputNum('9')}>
              9
            </button>
            <button
              className="btn operator"
              type="button"
              onClick={() => inputNum('*')}
            >
              x
            </button>
          </div>
          <div className="row">
            <button className="btn" type="button" onClick={() => inputNum('4')}>
              4
            </button>
            <button className="btn" type="button" onClick={() => inputNum('5')}>
              5
            </button>
            <button className="btn" type="button" onClick={() => inputNum('6')}>
              6
            </button>
            <button
              className="btn operator"
              type="button"
              onClick={() => inputNum('-')}
            >
              -
            </button>
          </div>
          <div className="row">
            <button className="btn" type="button" onClick={() => inputNum('1')}>
              1
            </button>
            <button className="btn" type="button" onClick={() => inputNum('2')}>
              2
            </button>
            <button className="btn" type="button" onClick={() => inputNum('3')}>
              3
            </button>
            <button
              className="btn operator"
              type="button"
              onClick={() => inputNum('+')}
            >
              +
            </button>
          </div>
          <div className="row">
            <button className="btn" type="button" onClick={() => inputNum('0')}>
              0
            </button>
            <button className="btn" type="button" onClick={() => inputNum('.')}>
              .
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => calculateResult('=')}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculator
