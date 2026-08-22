type Props = {
  diceRollResult: {
    typeOfDice: number;
    dicePool: number[];
  } | null;
};

const Results = ({ diceRollResult }: Props) => {
  if (!diceRollResult) {
    return (
      <section aria-labelledby="results-heading" className="@container">
        <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6">Latest roll</p>
        <h2
          id="results-heading"
          className="mt-1 max-w-[20ch] text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl"
        >
          Ready when you are
        </h2>
        <p className="mt-2 max-w-[56ch] text-base/7 text-pretty text-zinc-600 sm:text-sm/6">
          Set the dice and roll to see the total and each individual result.
        </p>
      </section>
    );
  }

  const { dicePool, typeOfDice } = diceRollResult;
  const diceCount = dicePool.length;
  const total = dicePool.reduce((sum, die) => sum + die, 0);

  return (
    <section aria-labelledby="results-heading" aria-live="polite" className="@container">
      <div className="flex flex-col gap-5 @sm:flex-row @sm:items-end @sm:justify-between">
        <div className="min-w-0">
          <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6">Latest roll</p>
          <h2
            id="results-heading"
            className="mt-1 text-2xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-xl"
          >
            {diceCount}d{typeOfDice}
          </h2>
        </div>
        <dl className="shrink-0">
          <dt className="text-base/7 font-medium text-zinc-900 sm:text-sm/6">Total</dt>
          <dd className="mt-1 text-4xl font-semibold tracking-tight text-teal-700 tabular-nums sm:text-3xl">
            {total}
          </dd>
        </dl>
      </div>
      <div className="mt-5 border-t border-zinc-950/10 pt-5">
        <p className="text-base/7 font-medium text-zinc-900 sm:text-sm/6">Individual dice</p>
        <ol
          aria-label={`Individual results for ${diceCount}d${typeOfDice}`}
          className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] gap-2"
          role="list"
        >
          {dicePool.map((die, index) => (
            <li
              key={`${index}-${die}`}
              className="rounded-lg bg-zinc-950/5 px-3 py-2 text-center text-2xl/8 font-medium text-zinc-950 tabular-nums sm:text-xl/7"
            >
              {die}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Results;
