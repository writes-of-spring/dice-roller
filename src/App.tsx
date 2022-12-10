import React, { useState } from "react";

function App() {
  const [rolledDice, setRolledDice] = useState([1]);
  const [numberOfDice, setNumberOfDice] = useState(2);
  const [typeOfDice, setTypeofDice] = useState(6);

  function rollDice() {
    const rolledDice = Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * typeOfDice + 1));
    setRolledDice(rolledDice);
  }
  const diceResult = rolledDice.reduce((acc, dice) => {
    return acc + dice;
  }, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    rollDice();
  }
  return (
    <div className="md:mt-4 rounded-xl p-4 container mx-auto bg-white text-gray-700">
      <h1 className="text-5xl text-center text-brand">Pete's Dice Roller</h1>
      <div className="flex">
        <div>
          <form onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-gray-700">Number of dice</span>
              <input
                className="form-input mt-1 block w-full"
                placeholder="2"
                min={1}
                max={10}
                value={numberOfDice}
                type="number"
                onChange={(e) => setNumberOfDice(parseInt(e.target.value))}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Type of dice</span>
              <select
                className="form-input mt-1 block w-full"
                placeholder="6"
                value={typeOfDice}
                onChange={(e) => setTypeofDice(parseInt(e.target.value))}
              >
                {" "}
                <option value="4">D4</option>
                <option value="6">D6</option>
                <option value="8">D8</option>
                <option value="10">D10</option>
                <option value="12">D12</option>
                <option value="20">D20</option>
              </select>
            </label>
            <button>Roll</button>
          </form>
        </div>
        <div>
          <h2>
            Rolling {numberOfDice} D{typeOfDice}
          </h2>
          <p>Result: {diceResult}</p>
          <p>Individual dice: {rolledDice.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
