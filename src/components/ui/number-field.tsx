import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField as NumberFieldPrimitive,
  type NumberFieldProps as NumberFieldPrimitiveProps,
  Text,
} from "react-aria-components";

import { cn } from "@/lib/utils";

type NumberFieldProps = Omit<NumberFieldPrimitiveProps, "children"> & {
  label: string;
  description?: string;
};

const NumberField = ({ className, label, description, ...props }: NumberFieldProps) => (
  <NumberFieldPrimitive className={cn("group flex flex-col gap-2", className)} {...props}>
    <Label className="text-base/7 font-medium text-zinc-900 sm:text-sm/6 dark:text-zinc-100">
      {label}
    </Label>
    <Group className="flex h-12 overflow-hidden rounded-lg bg-zinc-950/5 text-zinc-950 ring-1 ring-zinc-950/10 outline-none data-focus-within:ring-2 data-focus-within:ring-teal-700 data-invalid:ring-destructive sm:h-10 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-none dark:ring-white/10 dark:data-focus-within:ring-teal-400 data-disabled:opacity-50">
      <Input className="min-w-0 flex-1 bg-transparent px-3 text-base tabular-nums outline-none sm:text-sm" />
      <div className="grid w-10 shrink-0 grid-rows-2 border-l border-zinc-950/10 dark:border-white/10">
        <Button
          slot="increment"
          type="button"
          className="focus-visible:outline-inset grid place-items-center border-b border-zinc-950/10 text-zinc-600 hover:bg-zinc-950/10 focus-visible:outline-2 focus-visible:outline-teal-700 dark:border-white/10 dark:text-zinc-400 dark:shadow-none dark:hover:bg-white/10 dark:focus-visible:outline-teal-400"
        >
          <ChevronUpIcon aria-hidden="true" className="size-3.5" />
        </Button>
        <Button
          slot="decrement"
          type="button"
          className="focus-visible:outline-inset grid place-items-center text-zinc-600 hover:bg-zinc-950/10 focus-visible:outline-2 focus-visible:outline-teal-700 dark:text-zinc-400 dark:shadow-none dark:hover:bg-white/10 dark:focus-visible:outline-teal-400"
        >
          <ChevronDownIcon aria-hidden="true" className="size-3.5" />
        </Button>
      </div>
    </Group>
    {description ? (
      <Text
        slot="description"
        className="text-base/7 text-zinc-600 sm:text-sm/6 dark:text-zinc-400"
      >
        {description}
      </Text>
    ) : null}
  </NumberFieldPrimitive>
);

export { NumberField };
export type { NumberFieldProps };
