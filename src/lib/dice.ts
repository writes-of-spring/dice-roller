export type RollMode = "normal" | "advantage" | "disadvantage";

export type RollSettings = {
  numberOfDice: number;
  typeOfDice: number;
  rollMode: RollMode;
  modifier: number;
};

export type DiceRollResult = RollSettings & {
  dicePool: number[];
  keptDieIndex: number | null;
  subtotal: number;
  total: number;
};

export const diceSides = [4, 6, 8, 10, 12, 20, 100];

export function rollDice(
  settings: RollSettings,
  random: () => number = Math.random,
): DiceRollResult {
  const { numberOfDice, typeOfDice, rollMode, modifier } = settings;
  if (!Number.isInteger(numberOfDice) || numberOfDice < 1 || numberOfDice > 10) {
    throw new Error("Choose between 1 and 10 whole dice.");
  }
  if (!diceSides.includes(typeOfDice)) throw new Error("Choose a supported die type.");
  if (!["normal", "advantage", "disadvantage"].includes(rollMode)) {
    throw new Error("Choose a supported roll mode.");
  }
  if (!Number.isInteger(modifier) || Math.abs(modifier) > 1000) {
    throw new Error("Enter a whole modifier between -1000 and 1000.");
  }

  const mode = typeOfDice === 20 ? rollMode : "normal";
  const isSpecial = mode !== "normal";
  const isPercentile = typeOfDice === 100;
  const dicePool = Array.from({ length: isPercentile || isSpecial ? 2 : numberOfDice }, () =>
    isPercentile ? Math.floor(random() * 10) : Math.floor(random() * typeOfDice) + 1,
  );
  const keptDieIndex = isSpecial
    ? mode === "advantage"
      ? dicePool[0] >= dicePool[1]
        ? 0
        : 1
      : dicePool[0] <= dicePool[1]
        ? 0
        : 1
    : null;
  const subtotal = isPercentile
    ? dicePool[0] * 10 + dicePool[1] || 100
    : keptDieIndex === null
      ? dicePool.reduce((sum, die) => sum + die, 0)
      : dicePool[keptDieIndex];

  return {
    numberOfDice: isSpecial || isPercentile ? 1 : numberOfDice,
    typeOfDice,
    rollMode: mode,
    modifier,
    dicePool,
    keptDieIndex,
    subtotal,
    total: subtotal + modifier,
  };
}

export function formatRoll(result: RollSettings): string {
  const dice = result.typeOfDice === 100 ? "d100" : `${result.numberOfDice}d${result.typeOfDice}`;
  const modifier =
    result.modifier === 0 ? "" : ` ${result.modifier > 0 ? "+" : "−"} ${Math.abs(result.modifier)}`;
  const mode =
    result.rollMode === "normal"
      ? ""
      : ` · ${result.rollMode === "advantage" ? "Advantage" : "Disadvantage"}`;
  return `${dice}${modifier}${mode}`;
}
