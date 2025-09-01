import { useDataStore } from "@/store/dataStore";
import { Preset } from "./Configs";
import { Button } from "@/components/ui/button";
import { ConfigItemContextMenu } from "./ConfigItemContextMenu";

type Props = {
  item: Preset;
  disabled: boolean;
  deletePreset: (label: string) => void;
};

export const ConfigItem = ({ item, disabled, deletePreset }: Props) => {
  const { label, data } = item;
  const setBrightness = useDataStore((store) => store.setBrightness);
  const setContrast = useDataStore((store) => store.setContrast);

  const handleClick = () => {
    setBrightness(data.brightness);
    setContrast(data.contrast);
  };

  return (
    <div className="">
      <ConfigItemContextMenu deletePreset={() => deletePreset(label)}>
        <Button onClick={handleClick} className="min-w-20" disabled={disabled}>
          {label}
        </Button>
      </ConfigItemContextMenu>
    </div>
  );
};
