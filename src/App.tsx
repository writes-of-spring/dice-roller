import React, { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import Form, { FormTypes } from "./Form";
import Results, { type DiceRollResult } from "./Results";

function App() {
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);

  function rollDice(data: FormTypes) {
    const { numberOfDice, typeOfDice, rollMode } = data;

    if (typeOfDice === 100) {
      setDiceRollResult({
        typeOfDice,
        rollMode: "normal",
        dicePool: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
      });
      return;
    }

    const diceToRoll = typeOfDice === 20 && rollMode !== "normal" ? 2 : numberOfDice;
    const rolledDice = Array.from({ length: diceToRoll }, () =>
      Math.floor(Math.random() * typeOfDice + 1),
    );
    setDiceRollResult({
      typeOfDice,
      rollMode,
      dicePool: rolledDice,
    });
  }

  const onFormSubmit: SubmitHandler<FormTypes> = (data) => {
    rollDice(data);
  };

  return (
    <div className="isolate min-h-dvh bg-white text-zinc-700 antialiased dark:bg-zinc-950 dark:text-zinc-300">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header>
          <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl dark:text-zinc-100">
            Pete's Dice Roller
          </h1>
          <p className="mt-3 max-w-[48ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
            Choose your dice and leave the rest to chance.
          </p>
        </header>
        <div className="mt-8 grid gap-8 border-y border-zinc-950/10 py-5 lg:grid-cols-[21fr_19fr] dark:border-white/10">
          <section aria-labelledby="quick-roll-heading">
            <div>
              <h2
                id="quick-roll-heading"
                className="text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl dark:text-zinc-100"
              >
                Roll the dice
              </h2>
              <p className="mt-1 max-w-[48ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
                Select a quantity and die type.
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
