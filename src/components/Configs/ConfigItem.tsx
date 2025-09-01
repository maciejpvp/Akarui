import { useDataStore } from "@/store/dataStore";
import { Preset } from "./Configs";
import { Button } from "@/components/ui/button";

type Props = {
  item: Preset;
  disabled: boolean;
};

export const ConfigItem = ({ item, disabled }: Props) => {
  const { label, data } = item;
  const setBrightness = useDataStore((store) => store.setBrightness);
  const setContrast = useDataStore((store) => store.setContrast);

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
