import { Preset } from "./Configs";
import { Button } from "@/components/ui/button";

type Props = {
  item: Preset;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setContrast: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
};

export const ConfigItem = ({
  item,
  setBrightness,
  setContrast,
  disabled,
}: Props) => {
  const { label, data } = item;

  const handleClick = () => {
    setBrightness(data.brightness);
    setContrast(data.contrast);
  };

  return (
    <div className="">
      <Button onClick={handleClick} className="min-w-20" disabled={disabled}>
        {label}
      </Button>
    </div>
  );
};
