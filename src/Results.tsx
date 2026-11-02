import { Dices } from "lucide-react";
import { formatRoll, type DiceRollResult } from "./lib/dice";

type Props = { diceRollResult: DiceRollResult | null };

const Results = ({ diceRollResult }: Props) => {
  if (!diceRollResult) {
    return (
      <section aria-labelledby="results-heading" className="flex min-h-64 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <Dices
            aria-hidden="true"
            className="size-12 stroke-teal-700/40 dark:stroke-teal-400/40"
          />
          <h2
            id="results-heading"
            className="mt-5 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Ready when you are
          </h2>
          <p className="mt-2 max-w-[30ch] text-base/7 text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
            Your roll and its details will appear here.
          </p>
        </div>
      </section>
    );
  }

  const { dicePool, typeOfDice, keptDieIndex, total, subtotal, modifier } = diceRollResult;
  const isPercentileRoll = typeOfDice === 100;
  const rollLabel = formatRoll(diceRollResult);

  return (
    <section aria-labelledby="results-heading" aria-live="polite">
      <div className="flex items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <div className="min-w-0">
          <p className="text-base font-medium text-zinc-600 sm:text-sm dark:text-zinc-400">
            Latest roll
          </p>
          <h2
            id="results-heading"
            className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {rollLabel}
          </h2>
          {modifier !== 0 ? (
            <p className="mt-2 text-base text-zinc-600 sm:text-sm dark:text-zinc-400">
              Dice {subtotal} {modifier > 0 ? "+" : "−"} modifier {Math.abs(modifier)}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-base text-zinc-600 sm:text-sm dark:text-zinc-400">Total</p>
          <p className="text-5xl font-semibold tracking-tight text-teal-700 tabular-nums dark:text-teal-400">
            {total}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-base font-medium text-zinc-700 sm:text-sm dark:text-zinc-300">
          {isPercentileRoll ? "Percentile dice" : "Individual dice"}
        </p>
        <ol
          aria-label={
            isPercentileRoll
              ? "Tens and units results for d100"
              : `Individual results for ${rollLabel}`
          }
          className="mt-3 flex flex-wrap gap-2"
          role="list"
        >
          {dicePool.map((die, index) => {
            const isKept = keptDieIndex === index;
            const isDiscarded = keptDieIndex !== null && !isKept;
            const dieLabel = isPercentileRoll ? (index === 0 ? "Tens" : "Units") : null;
            const dieValue = isPercentileRoll && index === 0 ? die * 10 : die;
            return (
              <li
                key={`${index}-${die}`}
                className={`min-w-14 rounded-lg px-3 py-2 text-center tabular-nums ring-1 ${isKept ? "bg-teal-700 text-white ring-teal-700 dark:bg-teal-900 dark:ring-teal-800" : "bg-white text-zinc-900 ring-zinc-950/10 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-white/10"} ${isDiscarded ? "opacity-50" : ""}`}
              >
                {dieLabel || keptDieIndex !== null ? (
                  <span className="block text-xs">
                    {dieLabel || (isKept ? "Kept" : "Discarded")}
                  </span>
                ) : null}
                <span
                  className={`block text-xl font-semibold ${isDiscarded ? "line-through" : ""}`}
                >
                  {isPercentileRoll && index === 0 ? String(dieValue).padStart(2, "0") : dieValue}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Results;
