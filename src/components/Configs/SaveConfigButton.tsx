import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  savePreset: (label: string) => void;
};

export const SaveConfigButton = ({ savePreset }: Props) => {
  const [label, setLabel] = useState<string>("");

  const handleSave = () => {
    savePreset(label);
    document.getElementById("closeButton")?.click();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-zinc-300 w-10 h-10 rounded-full flex items-center justify-center absolute bottom-3 right-3 hover:scale-110 active:scale-100 transition-all duration-120">
          <FaPlus size={18} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="flex justify-center items-center bg-zinc-800 text-zinc-200">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-zinc-200">Save Preset</DrawerTitle>
            <DrawerDescription className="text-zinc-300">
              Save custom settings to reuse anytime.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-row gap-2">
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="new config..."
            />
            <Button variant="secondary" onClick={handleSave}>
              Submit
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button id="closeButton" variant="link">
                <span className="text-sm text-zinc-300">Cancel</span>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
