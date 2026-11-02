import { useRef, useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { Dices, RotateCcw, Trash2 } from "lucide-react";
import Form, { FormTypes } from "./Form";
import Results from "./Results";
import { rollDice, formatRoll, type DiceRollResult } from "./lib/dice";
import { Button } from "@/components/ui/button";

function App() {
  const [diceRollResult, setDiceRollResult] = useState<DiceRollResult | null>(null);
  const [history, setHistory] = useState<Array<{ id: number; result: DiceRollResult }>>([]);
  const nextRollId = useRef(1);
  const onFormSubmit: SubmitHandler<FormTypes> = (data) => recordRoll(data);

  function recordRoll(data: FormTypes) {
    const result = rollDice(data);
    setDiceRollResult(result);
    setHistory((previous) => [{ id: nextRollId.current++, result }, ...previous].slice(0, 10));
  }

  return (
    <div className="isolate min-h-dvh bg-[#f7f6f2] text-zinc-800 antialiased dark:bg-zinc-950 dark:text-zinc-200">
      <header className="border-b border-zinc-950/10 bg-white/70 dark:border-white/10 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a
            href="/"
            aria-label="Homepage"
            className="flex items-center gap-3 font-semibold tracking-tight text-zinc-950 dark:text-white"
          >
            <Dices
              aria-hidden="true"
              className="size-6 shrink-0 stroke-teal-700 dark:stroke-teal-400"
            />
            <span>Pete's Dice Roller</span>
          </a>
          <p className="font-mono text-xs tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            For every adventure
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-5xl dark:text-zinc-100">
            Let the dice decide.
          </h1>
          <p className="mt-3 max-w-[48ch] text-base/7 text-pretty text-zinc-600 dark:text-zinc-400">
            From quick checks to crucial encounters, every great story starts with a roll.
          </p>
        </div>
        <div className="grid overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-950/10 lg:grid-cols-[5fr_4fr] dark:bg-zinc-900 dark:ring-white/10">
          <section aria-labelledby="quick-roll-heading" className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="quick-roll-heading"
                  className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
                >
                  Build your roll
                </h2>
                <p className="mt-2 text-base/7 text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
                  Choose your dice and add a modifier.
                </p>
              </div>
            </div>
            <Form onSubmit={onFormSubmit} />
          </section>
          <div className="border-t border-zinc-950/10 bg-[#f0f3ee] p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-10 dark:border-white/10 dark:bg-zinc-900">
            <Results diceRollResult={diceRollResult} />
            {diceRollResult ? (
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onPress={() => recordRoll(diceRollResult)}
              >
                <RotateCcw aria-hidden="true" className="size-4" /> Roll again
              </Button>
            ) : null}
          </div>
        </div>
        <section aria-labelledby="history-heading" className="mt-12">
          <div className="flex items-end justify-between gap-4 border-b border-zinc-950/10 pb-4 dark:border-white/10">
            <div>
              <h2
                id="history-heading"
                className="text-xl font-semibold text-zinc-950 dark:text-zinc-100"
              >
                Recent rolls
              </h2>
            </div>
            {history.length > 0 ? (
              <Button type="button" variant="ghost" onPress={() => setHistory([])}>
                <Trash2 aria-hidden="true" className="size-4" /> Clear history
              </Button>
            ) : null}
          </div>
          {history.length ? (
            <ol className="divide-y divide-zinc-950/10 dark:divide-white/10" role="list">
              {history.map(({ id, result }, index) => (
                <li key={id} className="flex items-center gap-4 py-4">
                  <span className="w-8 shrink-0 font-mono text-xs text-zinc-400 tabular-nums">
                    {String(history.length - index).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base text-zinc-700 sm:text-sm dark:text-zinc-300">
                    {formatRoll(result)}
                  </span>
                  <span className="text-xl font-semibold text-teal-700 tabular-nums dark:text-teal-400">
                    {result.total}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-base/7 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
              Your rolls will appear here during this session.
            </p>
          )}
        </section>
        <footer className="mt-12 border-t border-zinc-950/10 pt-5 font-mono text-xs tracking-wide text-zinc-500 uppercase dark:border-white/10 dark:text-zinc-400">
          Made for the moments that matter.
        </footer>
      </main>
    </div>
  );
}

export default App;
