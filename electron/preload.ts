import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Commands
  setBrightness: (value: number) => {
    if (value < 0 || value > 100) return;
    return ipcRenderer.invoke("set-brightness", value);
  },
  setContrast: (value: number) => {
    if (value < 0 || value > 100) return;
    return ipcRenderer.invoke("set-contrast", value);
  },

  store: {
    get<T>(key: string): T {
      return ipcRenderer.sendSync("electron-store-get", key);
    },
    set<T>(key: string, val: T) {
      ipcRenderer.send("electron-store-set", key, val);
    },
  },

  // Optional: listen for messages from main
  onMessage: (callback: (msg: string) => void) => {
    ipcRenderer.on("main-process-message", (_event, msg) => callback(msg));
  },
});
