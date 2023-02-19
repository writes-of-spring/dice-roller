import React from "react";

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

type Props = {
  diceRollResult: {
    typeOfDice: number;
    dicePool: number[];
  } | null;
};

const Results = ({ diceRollResult }: Props) => {
  const showIndividualDice =
    diceRollResult?.dicePool && diceRollResult.dicePool.length > 1;

  const diceResult =
    diceRollResult?.dicePool?.reduce((acc, dice) => {
      return acc + dice;
    }, 0) ?? null;

  if (!diceRollResult)
    return <h2 className="text-4xl text-gray-700">Your adventure awaits!</h2>;
  return (
    <>
      <h2 className="text-4xl text-gray-700">Result: {diceResult}</h2>
      <p className="text-2xl text-gray-700">
        Rolling {diceRollResult.typeOfDice} D{diceRollResult.typeOfDice}
      </p>
      {showIndividualDice && (
        <p className="text-2xl text-gray-600">
          Individual dice:{" "}
          {formatter.format(diceRollResult.dicePool.map((d) => d.toString()))}
        </p>
      )}
    </>
  );
};

export default Results;
