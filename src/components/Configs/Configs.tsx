import { ConfigItem } from "./ConfigItem";

export type Preset = {
  label: string;
  data: {
    brightness: number;
    contrast: number;
  };
};

const presets: Preset[] = [
  {
    label: "Day",
    data: {
      brightness: 80,
      contrast: 90,
    },
  },
  {
    label: "Night",
    data: {
      brightness: 40,
      contrast: 50,
    },
  },
] as const;

type Props = {
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setContrast: React.Dispatch<React.SetStateAction<number>>;
};

export const Configs = ({ setBrightness, setContrast }: Props) => {
  return (
    <div>
      <h1 className="text-zinc-200">Presets</h1>
      <ul className="flex flex-wrap gap-2 h-34 overflow-y-scroll custom-scrollbar">
        {presets.map((item) => (
          <li key={item.label}>
            <ConfigItem
              item={item}
              setBrightness={setBrightness}
              setContrast={setContrast}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
