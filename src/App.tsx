import { useEffect, useState } from "react";
import { SliderWithLabel } from "./components/SliderWithLabel";
import { Button } from "@/components/ui/button";
import { Configs } from "./components/Configs/Configs";
import { OverlayLoader } from "./components/OverlayLoader";
import { useDataStore } from "./store/dataStore";

export const App = () => {
  const brightness = useDataStore((store) => store.brightness);
  const contrast = useDataStore((store) => store.contrast);
  const setBrightness = useDataStore((store) => store.setBrightness);
  const setContrast = useDataStore((store) => store.setContrast);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleApply = async () => {
    if (!window.api) {
      console.error("window.api is not available");
      return;
    }

    try {
      setIsLoading(true);
      await window.api.setBrightness(brightness);
      await window.api.setContrast(contrast);
      console.log("Monitor updated!");
    } catch (err) {
      console.error("Failed to update monitor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.api.onMessage((msg) => console.log("Message from main:", msg));
  }, []);

  return (
    <div className="bg-zinc-800 h-screen p-1 flex flex-col gap-2">
      {isLoading && <OverlayLoader />}
      <div className="flex flex-col gap-0">
        <div className="pl-1 flex flex-row gap-2 items-center">
          <h1 className="text-lg text-zinc-200">Akarui💡</h1>
          <h1 className="text-md text-zinc-300">あかるい</h1>
        </div>
        <div className="border-b border-zinc-300 opacity-90" />
      </div>
      <div className="flex flex-col justify-between h-[450px] p-2">
        <div className="flex flex-col gap-6  h-full">
          <SliderWithLabel
            disabled={isLoading}
            label="Brightness"
            value={brightness}
            onChange={(val: number) => setBrightness(val)}
          />
          <SliderWithLabel
            disabled={isLoading}
            label="Contrast"
            value={contrast}
            onChange={(val: number) => setContrast(val)}
          />
          <Configs disabled={isLoading} />
        </div>
        <div className="flex flex-col ">
          <Button disabled={isLoading} onClick={handleApply}>
            Apply
          </Button>
          <p className="text-zinc-400 text-xs pl-1 pt-1">
            Might take few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};
