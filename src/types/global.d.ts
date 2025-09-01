export {};

declare global {
  interface Window {
    api: {
      setBrightness: (value: number) => Promise<void>;
      setContrast: (value: number) => Promise<void>;
      onMessage: (callback: (msg: string) => void) => void;
      store: {
        get<T>(key: string): T;
        set<T>(key: string, val: T): void;
      };
    };
  }
}
