export {};

declare global {
  interface Window {
    api: {
      setBrightness: (value: number) => Promise<void>;
      setContrast: (value: number) => Promise<void>;
      onMessage: (callback: (msg: string) => void) => void;
    };
  }
}
