import React, { useState } from "react";

function App() {
  const [dicePool, setDicePool] = useState<number[] | null>(null);
  const numberOfDiceRef = React.useRef<HTMLInputElement>(null);
  const typeOfDiceRef = React.useRef<HTMLSelectElement>(null);

  function rollDice() {
    if (!numberOfDiceRef.current?.value || !typeOfDiceRef.current?.value) return;
    const numberOfDice = parseInt(numberOfDiceRef.current?.value || "2");
    const typeOfDice = parseInt(typeOfDiceRef.current?.value || "6");
    const rolledDice = Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * typeOfDice + 1));
    setDicePool(rolledDice);
  }
  const diceResult =
    dicePool?.reduce((acc, dice) => {
      return acc + dice;
    }, 0) ?? null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    rollDice();
  }
  const showIndividualDice = dicePool && dicePool.length > 1;
  return (
    <div className="md:mt-4 rounded-xl p-4 container mx-auto bg-white text-gray-700">
      <h1 className="text-5xl text-center font-bold text-gray-900  sm:mb-4">Pete's Dice Roller</h1>
      <div className="flex gap-4 flex-wrap-reverse">
        <div className="w-72 grow ">
          <form onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-gray-700">Number of dice</span>
              <input
                name="numberOfDice"
                ref={numberOfDiceRef}
                className="form-input mt-1 block "
                defaultValue={2}
                min={1}
                max={10}
                type="number"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Type of dice</span>
              <select name="typeOfDice" ref={typeOfDiceRef} className="form-input mt-1 block " placeholder="6">
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
        <div className="w-72 grow">
          {dicePool ? (
            <>
              <h2 className="text-4xl text-gray-700">Result: {diceResult}</h2>
              <p className="text-2xl text-gray-700">
                Rolling {numberOfDiceRef.current?.value} D{typeOfDiceRef.current?.value}
              </p>
              {showIndividualDice && <p className="text-2xl text-gray-600">Individual dice: {dicePool.join(", ")}</p>}
            </>
          ) : (
            <h2 className="text-4xl text-gray-700">Your adventure awaits!</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
