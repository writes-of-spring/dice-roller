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

const listformatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const Results = ({ diceRollResult }: Props) => {
  const showIndividualDice =
    diceRollResult?.dicePool && diceRollResult.dicePool.length > 1;

  const diceResult =
    diceRollResult?.dicePool?.reduce((acc, dice) => {
      return acc + dice;
    }, 0) ?? null;

  const diceRolls = diceRollResult?.dicePool?.map((d) => d.toString());
  if (!diceRollResult)
    return <h2 className="text-4xl text-gray-700">Your adventure awaits!</h2>;
  return (
    <>
      <h2 className="text-4xl text-gray-700">
        Rolled {diceResult}{" "}
        {diceRollResult.dicePool.length > 1
          ? `with ${listformatter.format(diceRolls ?? [])}`
          : null}
      </h2>
    </>
  );
};

export default Results;
