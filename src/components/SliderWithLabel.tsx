import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import {
  useMotionValue,
  animate,
  AnimationPlaybackControls,
} from "framer-motion";

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
  const motionVal = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(value);
  const isDragging = useRef(false);
  const animationControls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (!isDragging.current) {
      animationControls.current?.stop();

      animationControls.current = animate(motionVal, value, {
        type: "spring",
        stiffness: 200,
        damping: 30,
      });
    }
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (v) => {
      setDisplayValue(Math.round(v));
    });
    return () => unsubscribe();
  }, [motionVal]);

  const handleChange = (val: number[]) => {
    const newVal = val[0];
    const diff = Math.abs(newVal - value);

    animationControls.current?.stop();

    if (diff > 5) {
      console.log("Animating");
      animationControls.current = animate(motionVal, newVal, {
        type: "spring",
        stiffness: 200,
        damping: 30,
      });
    } else {
      motionVal.set(newVal);
    }

    isDragging.current = true;
    onChange(newVal);
  };

  const handleChangeEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col gap-2 items-start justify-center [&_.bg-primary]:bg-amber-300">
      <p className="text-zinc-200 gap-1">
        <span className="font-semibold">{label}</span>{" "}
        <span className="italic bg-zinc-900 p-2 rounded-md">
          {displayValue}
        </span>
      </p>
      <Slider
        disabled={disabled}
        value={[displayValue]}
        onValueChange={handleChange}
        onValueCommit={handleChangeEnd}
        min={min}
        max={max}
        step={1}
      />
    </div>
  );
};
