import Store from "electron-store";
import { Preset } from "@/components/Configs/Configs";

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

const store = new Store<{
  presets: typeof presets;
}>({
  name: "config",
  defaults: {
    presets,
  },
});

export default store;
