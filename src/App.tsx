import { useState } from "react";
import Form, { FormTypes } from "./Form";
import Results from "./Results";

type DiceRoll = {
  id: string;
  rolls: number[];
  timestamp: Date;
  rollType?: "normal" | "advantage" | "disadvantage";
  finalResult?: number;
};

function App() {
  const [dicePool, setDicePool] = useState<number[]>([]);
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [currentRollType, setCurrentRollType] = useState<
    "normal" | "advantage" | "disadvantage"
  >("normal");

  const onFormSubmit = async (data: FormTypes, isShiftPressed: boolean) => {
    setCurrentRollType(data.rollType);

    // Simulate a brief delay for rolling animation
    await new Promise((resolve) =>
      setTimeout(resolve, isShiftPressed ? 3000 : 500),
    );

    const { numberOfDice, typeOfDice, rollType } = data;
    let rolledDice: number[];
    let finalResult: number;

    if (
      typeOfDice === 20 &&
      (rollType === "advantage" || rollType === "disadvantage")
    ) {
      // Roll 2d20 for advantage/disadvantage
      rolledDice = Array.from({ length: 2 }, () =>
        Math.floor(Math.random() * 20 + 1),
      );

      // Take highest for advantage, lowest for disadvantage
      finalResult =
        rollType === "advantage"
          ? Math.max(...rolledDice)
          : Math.min(...rolledDice);
    } else {
      // Normal roll
      rolledDice = Array.from({ length: numberOfDice }, () =>
        Math.floor(Math.random() * typeOfDice + 1),
      );
      finalResult = rolledDice.reduce((a, b) => a + b, 0);
    }

    const newRoll: DiceRoll = {
      id: crypto.randomUUID(),
      rolls: rolledDice,
      timestamp: new Date(),
      rollType: typeOfDice === 20 ? rollType : undefined,
      finalResult,
    };

    setDicePool(rolledDice);
    setRollHistory((prev) => [newRoll, ...prev].slice(0, 10)); // Keep last 10 rolls
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <header className="mb-8 text-center">
          <h1 className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent">
            Pete's Dice Roller
          </h1>
          <p className="mt-2 text-gray-600">
            Roll with advantage! Hold Shift for suspense...
          </p>
        </header>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-8 md:flex-row-reverse md:items-start">
            <div className="w-full md:w-1/2">
              <Results dicePool={dicePool} rollType={currentRollType} />
            </div>
            <div className="w-full md:w-1/2">
              <Form onSubmit={onFormSubmit} />
            </div>
          </div>

          {rollHistory.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Recent Rolls
              </h2>
              <div className="space-y-2">
                {rollHistory.map((roll) => (
                  <div
                    key={roll.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 text-sm"
                  >
                    <span>
                      {roll.rollType ? (
                        <>
                          Rolled {roll.finalResult} with {roll.rollType} (
                          {roll.rolls.join(", ")})
                        </>
                      ) : (
                        <>
                          Rolled {roll.finalResult} ({roll.rolls.join(", ")})
                        </>
                      )}
                    </span>
                    <span className="text-gray-500">
                      {new Intl.RelativeTimeFormat("en", {
                        numeric: "auto",
                      }).format(
                        Math.round(
                          (roll.timestamp.getTime() - Date.now()) / 1000 / 60,
                        ),
                        "minute",
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
