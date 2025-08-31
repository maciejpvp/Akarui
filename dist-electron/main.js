import { app, ipcMain, BrowserWindow, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { exec } from "child_process";
function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout || "OK");
    });
  });
}
async function getMonitors() {
  const output = await runCommand(
    `ddcutil detect | grep "Display" | awk '{print $2}'`
  );
  return output.split("\n").map((line) => line.trim()).filter(Boolean).map(Number);
}
async function setVCP(vcpCode, value) {
  const displays = await getMonitors();
  if (displays.length === 0) throw new Error("No displays detected");
  const results = await Promise.all(
    displays.map(
      (d) => runCommand(`ddcutil --display ${d} setvcp ${vcpCode} ${value}`)
    )
  );
  return results.join("\n");
}
function setBrightness(value) {
  return setVCP(10, value);
}
function setContrast(value) {
  return setVCP(12, value);
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: false,
    alwaysOnTop: true,
    frame: true,
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      // must be true for contextBridge
      nodeIntegration: false
      // must be false for security
    },
    autoHideMenuBar: true
  });
  Menu.setApplicationMenu(null);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
ipcMain.handle("set-brightness", (_event, value) => {
  return setBrightness(value);
});
ipcMain.handle("set-contrast", (_event, value) => {
  return setContrast(value);
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
