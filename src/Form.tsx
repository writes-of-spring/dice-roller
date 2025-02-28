import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: FormTypes, isShiftPressed: boolean) => Promise<void>;
};

export type FormTypes = {
  numberOfDice: number;
  typeOfDice: number;
  rollType: "normal" | "advantage" | "disadvantage";
};

const Form = ({ onSubmit }: Props) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPressed(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPressed(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
  } = useForm<FormTypes>({
    defaultValues: {
      numberOfDice: 2,
      typeOfDice: 6,
      rollType: "normal",
    },
  });

  const selectedDice = watch("typeOfDice");
  const showAdvantageOptions = selectedDice === 20;

  const onSubmitWrapper = async (data: FormTypes) => {
    await onSubmit(data, isShiftPressed);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      <div>
        <label
          htmlFor="typeOfDice"
          className="mb-1 block text-sm text-gray-700"
        >
          Type of Dice
        </label>
        <select
          id="typeOfDice"
          {...register("typeOfDice", {
            required: true,
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base text-black focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
          disabled={isSubmitting}
        >
          <option value="4">D4</option>
          <option value="6">D6</option>
          <option value="8">D8</option>
          <option value="10">D10</option>
          <option value="12">D12</option>
          <option value="20">D20</option>
        </select>
      </div>
      <div>
        <label
          className="mb-1 block text-sm text-gray-700"
          htmlFor="numberOfDice"
        >
          Number of Dice
        </label>
        <input
          id="numberOfDice"
          {...register("numberOfDice", {
            required: true,
            valueAsNumber: true,
            min: 1,
            max: 10,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-3 text-base text-black focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
          defaultValue={2}
          min={1}
          max={10}
          type="number"
          disabled={isSubmitting || showAdvantageOptions}
        />
        {showAdvantageOptions && (
          <p className="mt-1 text-xs text-gray-500">
            Number of dice is fixed to 1 for D20 rolls
          </p>
        )}
      </div>

      {showAdvantageOptions && (
        <div>
          <label className="mb-1 block text-sm text-gray-700">Roll Type</label>
          <div className="mt-1 flex gap-3">
            <Controller
              control={control}
              shouldUnregister
              name="rollType"
              render={({ field }) => (
                <>
                  <button
                    type="button"
                    onClick={() => field.onChange("normal")}
                    disabled={isSubmitting}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      field.value === "normal"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("advantage")}
                    disabled={isSubmitting}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      field.value === "advantage"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    Advantage
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("disadvantage")}
                    disabled={isSubmitting}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      field.value === "disadvantage"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    Disadvantage
                  </button>
                </>
              )}
            />
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="ml-auto block items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isSubmitting ? <>Rolling...</> : <>Roll</>}
      </button>
    </form>
  );
};

export default Form;
