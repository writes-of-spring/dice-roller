import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  onSubmit: SubmitHandler<FormTypes>;
};

export type FormTypes = {
  numberOfDice: number;
  typeOfDice: number;
};

const Form = (props: Props) => {
  const { register, handleSubmit } = useForm<FormTypes>({
    defaultValues: {
      numberOfDice: 2,
      typeOfDice: 6,
    },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="mb-4">
        <label
          className="mb-1 block text-sm  text-gray-700"
          htmlFor="numberOfDice"
        >
          Number Of Dice
        </label>
        <input
          id="numberOfDice"
          {...register("numberOfDice", {
            required: true,
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={2}
          min={1}
          max={10}
          type="number"
        />
      </div>
      <div className="mb-4">
        <span className="mb-1 text-sm text-gray-700">Type of dice</span>
        <select
          {...register("typeOfDice", {
            required: true,
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="4">D4</option>
          <option value="6">D6</option>
          <option value="8">D8</option>
          <option value="10">D10</option>
          <option value="12">D12</option>
          <option value="20">D20</option>
        </select>
      </div>
      <button
        type="submit"
        className="ml-auto block items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Roll
      </button>
    </form>
  );
};

export default Form;
