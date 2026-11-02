import { assert, test } from "vitest";
import { rollDice, formatRoll } from "../src/lib/dice.ts";

const settings = { numberOfDice: 2, typeOfDice: 6, rollMode: "normal", modifier: 0 };
function sequence(...values) {
  return () => {
    assert.ok(values.length, "Unexpected extra random draw");
    return values.shift();
  };
}

test("normal rolls include both endpoints and apply a modifier once", () => {
  const result = rollDice({ ...settings, modifier: 3 }, sequence(0, 0.999999));
  assert.deepEqual(result.dicePool, [1, 6]);
  assert.equal(result.subtotal, 7);
  assert.equal(result.total, 10);
  assert.equal(formatRoll(result), "2d6 + 3");
});

test("advantage and disadvantage keep the correct d20 before modifying", () => {
  for (const [rollMode, subtotal, keptDieIndex] of [
    ["advantage", 20, 1],
    ["disadvantage", 1, 0],
  ]) {
    const result = rollDice(
      { ...settings, numberOfDice: 10, typeOfDice: 20, rollMode, modifier: -4 },
      sequence(0, 0.999999),
    );
    assert.equal(result.numberOfDice, 1);
    assert.equal(result.subtotal, subtotal);
    assert.equal(result.total, subtotal - 4);
    assert.equal(result.keptDieIndex, keptDieIndex);
  }
});

test("tied advantage dice keep exactly one die", () => {
  const result = rollDice(
    { ...settings, typeOfDice: 20, rollMode: "advantage" },
    sequence(0.5, 0.5),
  );
  assert.equal(result.keptDieIndex, 0);
  assert.equal(result.total, 11);
});

test("percentile dice cover every value 1–100 exactly once", () => {
  const totals = [];
  for (let tens = 0; tens < 10; tens++) {
    for (let units = 0; units < 10; units++) {
      const result = rollDice(
        { ...settings, typeOfDice: 100 },
        sequence((tens + 0.5) / 10, (units + 0.5) / 10),
      );
      totals.push(result.total);
    }
  }
  assert.deepEqual(
    totals.sort((a, b) => a - b),
    Array.from({ length: 100 }, (_, i) => i + 1),
  );
  assert.equal(rollDice({ ...settings, typeOfDice: 100, modifier: 5 }, sequence(0, 0)).total, 105);
});

test("non-d20 dice normalize special modes", () => {
  const result = rollDice({ ...settings, rollMode: "advantage" }, sequence(0, 0));
  assert.equal(result.rollMode, "normal");
  assert.equal(result.total, 2);
});

test("invalid inputs cannot generate a roll", () => {
  for (const numberOfDice of [0, 11, 1.5, NaN, Infinity]) {
    assert.throws(() => rollDice({ ...settings, numberOfDice }));
  }
  for (const modifier of [NaN, Infinity, 0.5, -1001, 1001]) {
    assert.throws(() => rollDice({ ...settings, modifier }));
  }
  assert.throws(() => rollDice({ ...settings, typeOfDice: 3 }));
  assert.throws(() => rollDice({ ...settings, rollMode: "invalid" }));
});
