import { useEffect, useState } from "react";
import { ConfigItem } from "./ConfigItem";
import { SaveConfigButton } from "./SaveConfigButton";

export type Preset = {
  label: string;
  data: {
    brightness: number;
    contrast: number;
  };
};

type Props = {
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setContrast: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
};

export const Configs = ({ setBrightness, setContrast, disabled }: Props) => {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    const response = window.api.store.get<Preset[]>("presets");
    console.log(response);

    setPresets(response);
  }, []);

  return (
    <div>
      <h1 className="text-zinc-200">Presets</h1>
      <ul className="flex flex-wrap relative gap-2 h-34 overflow-y-scroll custom-scrollbar">
        {presets.map((item) => (
          <li key={item.label}>
            <ConfigItem
              disabled={disabled}
              item={item}
              setBrightness={setBrightness}
              setContrast={setContrast}
            />
          </li>
        ))}
        <SaveConfigButton />
      </ul>
    </div>
  );
};
