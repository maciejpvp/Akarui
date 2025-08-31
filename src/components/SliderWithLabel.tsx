import { Slider } from "@/components/ui/slider";

type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  disabled: boolean;
};

export const SliderWithLabel = ({
  label = "Label",
  value,
  min = 1,
  max = 100,
  disabled,
  onChange,
}: Props) => {
  const handleChange = (e: number[]) => onChange(e[0]);

  return (
    <div className="flex flex-col gap-1 items-start justify-center [&_.bg-primary]:bg-amber-300">
      <p className="text-zinc-200 ">
        {label} {value}
      </p>
      <Slider
        disabled={disabled}
        value={[value]}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={1}
      />
    </div>
  );
};
