import { useEffect, useState } from "react";
import { SliderWithLabel } from "./components/SliderWithLabel";
import { Button } from "@/components/ui/button";
import { Configs } from "./components/Configs/Configs";

export const App = () => {
  const [brightness, setBrigtness] = useState<number>(1);
  const [contrast, setContrast] = useState<number>(1);

  const handleApply = async () => {
    if (!window.api) {
      console.error("window.api is not available");
      return;
    }

    try {
      await window.api.setBrightness(brightness);
      await window.api.setContrast(contrast);
      console.log("Monitor updated!");
    } catch (err) {
      console.error("Failed to update monitor:", err);
    }
  };

  useEffect(() => {
    window.api.onMessage((msg) => console.log("Message from main:", msg));
  }, []);

  return (
    <div className="bg-zinc-800 h-screen p-1 flex flex-col gap-5">
      <div className="flex flex-col gap-0">
        <h1 className="text-lg text-zinc-200">Akarui💡</h1>
        <div className="border-b border-zinc-300 opacity-90" />
      </div>
      <div className="flex flex-col justify-between h-full p-2">
        <div className="flex flex-col gap-4">
          <SliderWithLabel
            label="Brigtness"
            value={brightness}
            onChange={(val: number) => setBrigtness(val)}
          />
          <SliderWithLabel
            label="Contrast"
            value={contrast}
            onChange={(val: number) => setContrast(val)}
          />
          <Configs setBrightness={setBrigtness} setContrast={setContrast} />
        </div>
        <div className="flex flex-col">
          <Button onClick={handleApply}>Apply</Button>
          <p className="text-zinc-400 text-xs pl-1 pt-1">
            Might take few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};
