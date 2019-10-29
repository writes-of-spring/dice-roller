import React, { useState } from 'react'
import './App.css'

function App() {
  // const [firstDieResult, setFirstDieResult] = useState(1);
  // const [secondDieResult, setSecondDieResult] = useState(6);
  const [diceResult, setDiceResult] = useState(1)
  const [rolledDice, setRolledDice] = useState([])
  const [numberOfDice, setNumberOfDice] = useState(2)
  const [typeOfDice, setTypeofDice] = useState(6)
  // const firstDieImage = require(`./assets/${firstDieResult}.png`);
  // const secondDieImage = require(`./assets/${secondDieResult}.png`);

  function rollDice() {
    const rolledDice = Array.from({ length: numberOfDice }, () =>
      Math.floor(Math.random() * typeOfDice + 1)
    )
    console.log(rolledDice)
    setDiceResult(
      rolledDice.reduce((acc, dice) => {
        return acc + dice
      }, 0)
    )
    setRolledDice(rolledDice)
  }

  return (
    <div className="App">
      <h1>You rolled:</h1>
      <span className="roll-total-result">{diceResult}</span>
      <div className="roll-individual-results">
        <h3>With a:</h3>
        {rolledDice.map(result => {
          return <span className="singleDice">{result}</span>
        })}
      </div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
      <div className="roll-controls">
        <div className="numberOfDice">
          <button
            className="dice-amount"
            onClick={() => setNumberOfDice(numberOfDice - 1)}
          >
            -
          </button>
          <span style={{ margin: '1em 0.5em', fontFeatureSettings: 'tnum' }}>
            {' '}
            Number of dice: {numberOfDice}
          </span>
          <button
            className="dice-amount"
            onClick={() => setNumberOfDice(numberOfDice + 1)}
          >
            +
          </button>
        </div>
        <div className="typeOfDice">
          <select
            value={typeOfDice}
            onChange={e => setTypeofDice(parseInt(e.target.value))}
          >
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default App
