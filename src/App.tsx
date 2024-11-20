import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Form, { FormTypes } from "./Form";
import Results from "./Results";

function App() {
  const [dicePool, setDicePool] = useState<number[]>([]);

  const onFormSubmit: SubmitHandler<FormTypes> = (data) => {
    const { numberOfDice, typeOfDice } = data;
    const rolledDice = Array.from({ length: numberOfDice }, () =>
      Math.floor(Math.random() * typeOfDice + 1)
    );
    setDicePool(rolledDice);
  };

  return (
    <div className="container mx-auto max-w-lg rounded-xl bg-white p-4 text-gray-700 md:mt-4">
      <h1 className="font-boldtext-gray-900 mb-4 text-center text-5xl">
        Pete's Dice Roller
      </h1>
      <div className="flex flex-wrap-reverse gap-4">
        <div className="w-72 grow ">
          <Form onSubmit={onFormSubmit} />
        </div>
        <div className="w-72 grow">
          <Results dicePool={dicePool} />
        </div>
      </div>
    </div>
  );
}

export default App;
