import { useEffect, useState } from "react";
import { ConfigItem } from "./ConfigItem";
import { SaveConfigButton } from "./SaveConfigButton";
import { useDataStore } from "@/store/dataStore";

export type Preset = {
  label: string;
  data: {
    brightness: number;
    contrast: number;
  };
};

type Props = {
  disabled: boolean;
};

export const Configs = ({ disabled }: Props) => {
  const [presets, setPresets] = useState<Preset[]>([]);
  const brightness = useDataStore((store) => store.brightness);
  const contrast = useDataStore((store) => store.contrast);

  const savePreset = (label: string) => {
    const doesExist = presets.some((s) => s.label === label);

    if (doesExist) return;

    const obj: Preset = {
      label: label,
      data: {
        brightness,
        contrast,
      },
    };

    const newPresets = [...presets, obj];

    window.api.store.set("presets", newPresets);
    setPresets(newPresets);
  };

  const deletePreset = (label: string) => {
    const newPresets = presets.filter((f) => f.label !== label);

    window.api.store.set("presets", newPresets);
    setPresets(newPresets);
  };

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
              deletePreset={deletePreset}
              disabled={disabled}
              item={item}
            />
          </li>
        ))}
        <SaveConfigButton savePreset={savePreset} />
      </ul>
    </div>
  );
};
