import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

type Props = {
  onSubmit: SubmitHandler<FormTypes>;
};

export type FormTypes = {
  numberOfDice: number;
  typeOfDice: number;
};

const diceOptions = [4, 6, 8, 10, 12, 20].map((sides) => ({
  id: String(sides),
  sides,
}));

const Form = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useForm<FormTypes>({
    defaultValues: {
      numberOfDice: 2,
      typeOfDice: 6,
    },
  });

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
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
            />
          )}
        />
        <div>
          <label
            id="type-of-dice-label"
            className="text-base/7 font-medium text-zinc-900 sm:text-sm/6"
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
                  onChange={(key) => field.onChange(Number(key))}
                >
                  {(option) => <SelectItem>D{option.sides}</SelectItem>}
                </Select>
              )}
            />
          </div>
        </div>
        <Button
          size="lg"
          type="submit"
          className="h-12 rounded-lg bg-teal-700 px-3 text-base/6 text-white hover:bg-teal-800 focus-visible:border-teal-700 focus-visible:ring-2 focus-visible:ring-teal-700 sm:h-10 sm:text-sm/5"
        >
          Roll now
        </Button>
      </div>
    </form>
  );
};

export default Form;
