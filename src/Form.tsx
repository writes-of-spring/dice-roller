import { useMemo } from "react";
import { NumberParser } from "@internationalized/number";
import { useLocale } from "react-aria-components";
import { Controller, type SubmitHandler, useForm, useWatch } from "react-hook-form";

import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";
import { diceSides, type RollMode, type RollSettings } from "./lib/dice";

type Props = {
  onSubmit: SubmitHandler<FormTypes>;
};

export type FormTypes = RollSettings;

const diceOptions = diceSides.map((sides) => ({ id: String(sides), sides }));

const rollModes: Array<{ id: RollMode; label: string }> = [
  { id: "normal", label: "Normal" },
  { id: "advantage", label: "Advantage" },
  { id: "disadvantage", label: "Disadvantage" },
];

const Form = ({ onSubmit }: Props) => {
  const { locale } = useLocale();
  const numberParser = useMemo(() => new NumberParser(locale), [locale]);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormTypes>({
    defaultValues: {
      numberOfDice: 2,
      typeOfDice: 6,
      rollMode: "normal",
      modifier: 0,
    },
  });

  const typeOfDice = useWatch({ control, name: "typeOfDice" });
  const rollMode = useWatch({ control, name: "rollMode" });
  const isPercentileRoll = typeOfDice === 100;
  const isD20SpecialRoll = typeOfDice === 20 && rollMode !== "normal";
  const isSingleCheck = isPercentileRoll || isD20SpecialRoll;

  const submitLabel =
    rollMode === "advantage"
      ? "Roll with advantage"
      : rollMode === "disadvantage"
        ? "Roll with disadvantage"
        : "Roll now";

  return (
    <form
      className="@container mt-8"
      onSubmit={handleSubmit((data, event) =>
        onSubmit({ ...data, numberOfDice: isSingleCheck ? 1 : data.numberOfDice }, event),
      )}
    >
      <div className="grid gap-4 @sm:grid-cols-3 @sm:items-end">
        <Controller
          control={control}
          name="numberOfDice"
          rules={{
            validate: (value) =>
              isSingleCheck ||
              (Number.isInteger(value) && value >= 1 && value <= 10) ||
              "Choose between 1 and 10 whole dice.",
          }}
          render={({ field }) => (
            <NumberField
              className="min-w-0"
              isInvalid={!!errors.numberOfDice}
              aria-describedby={errors.numberOfDice ? "roll-errors" : undefined}
              isRequired
              isWheelDisabled
              label="Dice"
              commitBehavior="validate"
              maxValue={10}
              minValue={1}
              name={field.name}
              step={1}
              value={isSingleCheck ? 1 : field.value}
              isDisabled={isSingleCheck}
              onBlur={(event) => {
                const value = numberParser.parse(
                  event.target instanceof HTMLInputElement ? event.target.value : "",
                );
                if (!Number.isInteger(value) || value < 1 || value > 10) field.onChange(1);
                field.onBlur();
              }}
              onChange={(value) =>
                field.onChange(Number.isInteger(value) && value >= 1 && value <= 10 ? value : 1)
              }
            />
          )}
        />
        <div>
          <label
            id="type-of-dice-label"
            className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100"
          >
            Sides
          </label>
          <div className="mt-2">
            <Controller
              control={control}
              name="typeOfDice"
              render={({ field }) => (
                <Select
                  aria-labelledby="type-of-dice-label"
                  items={diceOptions}
                  name={field.name}
                  value={String(field.value)}
                  onBlur={field.onBlur}
                  onChange={(key) => {
                    const nextType = Number(key);
                    field.onChange(nextType);
                    if (nextType !== 20) {
                      setValue("rollMode", "normal");
                    }
                  }}
                >
                  {(option) => (
                    <SelectItem textValue={`D${option.sides}`}>D{option.sides}</SelectItem>
                  )}
                </Select>
              )}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="modifier"
          rules={{
            validate: (value) =>
              (Number.isInteger(value) && Math.abs(value) <= 1000) ||
              "Enter a whole modifier between -1000 and 1000.",
          }}
          render={({ field }) => (
            <NumberField
              label="Modifier"
              isRequired
              isWheelDisabled
              commitBehavior="validate"
              minValue={-1000}
              maxValue={1000}
              step={1}
              name={field.name}
              value={field.value}
              onBlur={(event) => {
                const value = numberParser.parse(
                  event.target instanceof HTMLInputElement ? event.target.value : "",
                );
                if (!Number.isInteger(value) || Math.abs(value) > 1000) field.onChange(0);
                field.onBlur();
              }}
              onChange={(value) =>
                field.onChange(Number.isInteger(value) && Math.abs(value) <= 1000 ? value : 0)
              }
              isInvalid={!!errors.modifier}
              aria-describedby={errors.modifier ? "roll-errors" : undefined}
            />
          )}
        />
        <Button
          size="lg"
          type="submit"
          className="mt-2 h-12 rounded-lg bg-teal-800 px-3 text-base/6 text-white hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:h-10 sm:text-sm/5 @sm:col-span-3 dark:bg-teal-700 dark:shadow-none dark:hover:bg-teal-600"
        >
          {submitLabel}
        </Button>
      </div>
      {errors.numberOfDice || errors.modifier ? (
        <p id="roll-errors" role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">
          {errors.numberOfDice?.message || errors.modifier?.message}
        </p>
      ) : null}
      {isSingleCheck ? (
        <p className="mt-2 text-base/7 text-zinc-600 sm:text-sm/6 dark:text-zinc-400">
          {isPercentileRoll
            ? "D100 uses a tens die and a units die."
            : "Advantage and disadvantage use two d20s."}
        </p>
      ) : null}
      {typeOfDice === 20 ? (
        <fieldset className="mt-4">
          <legend className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
            Roll mode
          </legend>
          <Controller
            control={control}
            name="rollMode"
            render={({ field }) => (
              <div className="mt-2 flex flex-wrap gap-2">
                {rollModes.map((mode) => {
                  const isSelected = field.value === mode.id;

                  return (
                    <Button
                      key={mode.id}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-600 dark:shadow-none dark:hover:bg-teal-500"
                          : "dark:shadow-none"
                      }
                      onPress={() => {
                        field.onChange(mode.id);
                      }}
                    >
                      {mode.label}
                    </Button>
                  );
                })}
              </div>
            )}
          />
        </fieldset>
      ) : null}
    </form>
  );
};

export default Form;
