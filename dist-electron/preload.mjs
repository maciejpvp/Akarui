"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // Commands
  setBrightness: (value) => {
    if (value < 0 || value > 100) return;
    return electron.ipcRenderer.invoke("set-brightness", value);
  },
  setContrast: (value) => {
    if (value < 0 || value > 100) return;
    return electron.ipcRenderer.invoke("set-contrast", value);
  },
  // Optional: listen for messages from main
  onMessage: (callback) => {
    electron.ipcRenderer.on("main-process-message", (_event, msg) => callback(msg));
  }
});
