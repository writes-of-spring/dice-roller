import React, { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
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
      Math.floor(Math.random() * typeOfDice + 1),
    );
    setDiceRollResult({
      typeOfDice,
      dicePool: rolledDice,
    });
  }

  const onFormSubmit: SubmitHandler<FormTypes> = (data) => {
    rollDice(data);
  };

  return (
    <div className="isolate min-h-dvh bg-white text-zinc-700 antialiased">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header>
          <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl">
            Pete's Dice Roller
          </h1>
          <p className="mt-3 max-w-[48ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6">
            Quick, clear dice rolls for every turn at the table.
          </p>
        </header>
        <div className="mt-8 grid gap-8 border-y border-zinc-950/10 py-5 lg:grid-cols-[21fr_19fr]">
          <section aria-labelledby="quick-roll-heading">
            <div>
              <h2
                id="quick-roll-heading"
                className="text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl"
              >
                Quick roll
              </h2>
              <p className="mt-1 max-w-[48ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6">
                Choose your dice, then roll when you are ready.
              </p>
            </div>
            <Form onSubmit={onFormSubmit} />
          </section>
          <Results diceRollResult={diceRollResult} />
        </div>
      </main>
    </div>
  );
}

export default App;
