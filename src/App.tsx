import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Form, { FormTypes } from "./Form";
import Results from "./Results";

function App() {
  const [diceRollResult, setDiceRollResult] = useState<{
    typeOfDice: number;
    dicePool: number[];
  } | null>(null);

  function rollDice(data: FormTypes) {
    const { numberOfDice, typeOfDice } = data;
    const rolledDice = Array.from({ length: numberOfDice }, () =>
      Math.floor(Math.random() * typeOfDice + 1)
    );
    setDiceRollResult({
      typeOfDice,
      dicePool: rolledDice,
    });
  }

  const onFormSubmit: SubmitHandler<any> = (data) => {
    rollDice(data);
  };

  return (
    <div className="container mx-auto rounded-xl bg-white p-4 text-gray-700 md:mt-4">
      <h1 className="text-center text-5xl font-bold text-gray-900  sm:mb-4 lg:mb-8">
        Pete's Dice Roller
      </h1>
      <div className="flex flex-wrap-reverse gap-4">
        <div className="w-72 grow ">
          <Form onSubmit={onFormSubmit} />
        </div>
        <div className="w-72 grow">
          <Results diceRollResult={diceRollResult} />
        </div>
      </div>
    </div>
  );
}

export default App;
