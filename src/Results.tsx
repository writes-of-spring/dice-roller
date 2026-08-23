import type { RollMode } from "./Form";

export type DiceRollResult = {
  typeOfDice: number;
  dicePool: number[];
  rollMode: RollMode;
};

type Props = {
  diceRollResult: DiceRollResult | null;
};

const Results = ({ diceRollResult }: Props) => {
  if (!diceRollResult) {
    return (
      <section aria-labelledby="results-heading" className="@container">
        <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
          Latest roll
        </p>
        <h2
          id="results-heading"
          className="mt-1 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl dark:text-zinc-100"
        >
          No rolls yet
        </h2>
        <p className="mt-2 max-w-[56ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
          Your total and individual results will appear here.
        </p>
      </section>
    );
  }

  const { dicePool, typeOfDice, rollMode } = diceRollResult;
  const isPercentileRoll = typeOfDice === 100;
  const isD20SpecialRoll = typeOfDice === 20 && rollMode !== "normal";
  const diceCount = dicePool.length;
  const keptDieIndex = isD20SpecialRoll
    ? rollMode === "advantage"
      ? dicePool[0] >= dicePool[1]
        ? 0
        : 1
      : dicePool[0] <= dicePool[1]
        ? 0
        : 1
    : null;
  const percentileTotal = dicePool[0] * 10 + dicePool[1];
  const total = isPercentileRoll
    ? percentileTotal || 100
    : keptDieIndex === null
      ? dicePool.reduce((sum, die) => sum + die, 0)
      : dicePool[keptDieIndex];
  const rollLabel = isPercentileRoll
    ? "d100"
    : isD20SpecialRoll
      ? `d20 · ${rollMode === "advantage" ? "Advantage" : "Disadvantage"}`
      : `${diceCount}d${typeOfDice}`;

  return (
    <section aria-labelledby="results-heading" aria-live="polite" className="@container">
      <div className="flex flex-col gap-5 @sm:flex-row @sm:items-end @sm:justify-between">
        <div className="min-w-0">
          <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
            Latest roll
          </p>
          <h2
            id="results-heading"
            className="mt-1 text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl dark:text-zinc-100"
          >
            {rollLabel}
          </h2>
        </div>
        <dl className="shrink-0">
          <dt className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
            Total
          </dt>
          <dd className="mt-1 text-4xl font-semibold tracking-tight text-teal-700 tabular-nums sm:text-3xl dark:text-teal-400">
            {total}
          </dd>
        </dl>
      </div>
      <div className="mt-5 border-t border-zinc-950/10 pt-5 dark:border-white/10">
        <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
          {isPercentileRoll ? "Percentile dice" : "Individual dice"}
        </p>
        <ol
          aria-label={
            isPercentileRoll
              ? "Tens and units results for d100"
              : `Individual results for ${rollLabel}`
          }
          className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] gap-2"
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
                className={`rounded-lg px-3 py-2 text-center text-zinc-950 tabular-nums dark:text-zinc-100 dark:shadow-none ${
                  isKept
                    ? "bg-teal-700/10 inset-ring inset-ring-teal-700/20 dark:bg-teal-400/10 dark:inset-ring-teal-400/20"
                    : "bg-zinc-950/5 dark:bg-zinc-900 dark:inset-ring dark:inset-ring-white/5"
                } ${isDiscarded ? "text-zinc-500 dark:text-zinc-500" : ""}`}
              >
                {dieLabel || keptDieIndex !== null ? (
                  <span className="block text-xs/5 font-medium tracking-wide text-zinc-600 no-underline dark:text-zinc-400">
                    {dieLabel || (isKept ? "Kept" : "Discarded")}
                  </span>
                ) : null}
                <span
                  className={`block text-2xl/8 font-medium sm:text-xl/7 ${
                    isDiscarded ? "line-through" : ""
                  }`}
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
