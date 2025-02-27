import React from "react";

type Props = {
  dicePool: number[];
  isRolling: boolean;
  rollType: "normal" | "advantage" | "disadvantage";
};

const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const Results: React.FC<Props> = ({ dicePool, isRolling, rollType }) => {
  const isD20WithAdvantage =
    dicePool.length === 2 &&
    (rollType === "advantage" || rollType === "disadvantage");
  const diceResult = isD20WithAdvantage
    ? rollType === "advantage"
      ? Math.max(...dicePool)
      : Math.min(...dicePool)
    : dicePool.reduce((acc, dice) => acc + dice, 0);
  const diceRolls = dicePool.map((d) => d.toString());

  if (isRolling) {
    return (
      <div className="text-center" role="status" aria-label="Rolling dice">
        <h2 className="animate-bounce text-4xl text-gray-700">Rolling...</h2>
      </div>
    );
  }

  if (dicePool.length === 0) {
    return (
      <h2
        className="animate-fade-in text-center text-4xl text-gray-700"
        role="status"
        aria-label="Ready to roll"
      >
        Your adventure awaits!
      </h2>
    );
  }

  return (
    <div className="space-y-4" role="status" aria-live="polite">
      <h2 className="animate-bounce-in text-center text-4xl text-gray-700">
        {isD20WithAdvantage ? (
          <>
            Rolled{" "}
            <span className="font-bold text-indigo-600">{diceResult}</span>
            <span className="block text-lg">
              with {rollType} ({diceRolls.join(", ")})
            </span>
          </>
        ) : (
          <>
            Rolled{" "}
            <span className="font-bold text-indigo-600">{diceResult}</span>
            {dicePool.length > 1 && (
              <span className="block text-lg text-gray-800">
                Individual rolls: {listFormatter.format(diceRolls)}
              </span>
            )}
          </>
        )}
      </h2>
    </div>
  );
};

export default Results;
