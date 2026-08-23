import { Controller, type SubmitHandler, useForm, useWatch } from "react-hook-form";

import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

type Props = {
  onSubmit: SubmitHandler<FormTypes>;
};

export type FormTypes = {
  numberOfDice: number;
  typeOfDice: number;
  rollMode: RollMode;
};

export type RollMode = "normal" | "advantage" | "disadvantage";

const diceOptions = [4, 6, 8, 10, 12, 20, 100].map((sides) => ({
  id: String(sides),
  sides,
}));

const rollModes: Array<{ id: RollMode; label: string }> = [
  { id: "normal", label: "Normal" },
  { id: "advantage", label: "Advantage" },
  { id: "disadvantage", label: "Disadvantage" },
];

const Form = ({ onSubmit }: Props) => {
  const { handleSubmit, control, setValue } = useForm<FormTypes>({
    defaultValues: {
      numberOfDice: 2,
      typeOfDice: 6,
      rollMode: "normal",
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
    <form className="@container mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 @sm:grid-cols-[1fr_1fr_auto] @sm:items-end">
        <Controller
          control={control}
          name="numberOfDice"
          render={({ field }) => (
            <NumberField
              className="min-w-0"
              isRequired
              isWheelDisabled
              label="Dice"
              maxValue={10}
              minValue={1}
              name={field.name}
              step={1}
              value={isSingleCheck ? 1 : field.value}
              isDisabled={isSingleCheck}
              onBlur={field.onBlur}
              onChange={field.onChange}
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
                    if (nextType === 100) {
                      setValue("numberOfDice", 1);
                    }
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
        <Button
          size="lg"
          type="submit"
          className="h-12 rounded-lg bg-teal-700 px-3 text-base/6 text-white hover:bg-teal-800 focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-700 sm:h-10 sm:text-sm/5 dark:bg-teal-600 dark:shadow-none dark:hover:bg-teal-500 dark:focus-visible:border-teal-400 dark:focus-visible:ring-teal-400"
        >
          {submitLabel}
        </Button>
      </div>
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
                        if (mode.id !== "normal") {
                          setValue("numberOfDice", 1);
                        }
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
