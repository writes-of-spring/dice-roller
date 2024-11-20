import React from "react";

type Props = {
  dicePool: number[];
};

const listformatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const Results = ({ dicePool }: Props) => {
  const showIndividualDice = dicePool.length > 1;

  const diceResult =
    dicePool?.reduce((acc, dice) => {
      return acc + dice;
    }, 0) ?? null;

  const diceRolls = dicePool?.map((d) => d.toString());
  if (dicePool.length === 0) {
    return <h2 className="text-4xl text-gray-700">Your adventure awaits!</h2>;
  }
  return (
    <>
      <h2 className="text-4xl text-gray-700">
        Rolled {diceResult}{" "}
        {dicePool.length > 1
          ? `with ${listformatter.format(diceRolls ?? [])}`
          : null}
      </h2>
    </>
  );
};

export default Results;
