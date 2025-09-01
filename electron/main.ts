import { app, BrowserWindow, ipcMain, Menu } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { setBrightness, setContrast } from "./utils/monitorUtils";
import store from "./store";

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT!, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

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
      contextIsolation: true, // must be true for contextBridge
      nodeIntegration: false, // must be false for security
    },
    autoHideMenuBar: true,
  });

  Menu.setApplicationMenu(null);

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  if (!app.isPackaged) {
    // Only enable DevTools shortcut in development
    win.webContents.on("before-input-event", (event, input) => {
      if (input.control && input.shift && input.key.toLowerCase() === "i") {
        win?.webContents.openDevTools({ mode: "detach" });
        event.preventDefault();
      }
    });

    win.webContents.on("did-finish-load", () => {
      win?.webContents.executeJavaScript(`
        const devBadge = document.createElement('div');
        devBadge.innerText = 'DEV';
        devBadge.style.position = 'fixed';
        devBadge.style.top = '1px';
        devBadge.style.right = '10px';
        devBadge.style.padding = '2px 6px';
        devBadge.style.background = 'red';
        devBadge.style.color = 'white';
        devBadge.style.fontSize = '10px';
        devBadge.style.fontWeight = 'bold';
        devBadge.style.borderRadius = '3px';
        devBadge.style.zIndex = '9999';
        document.body.appendChild(devBadge);
      `);
    });
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

ipcMain.handle("set-brightness", (_event, value: number) => {
  return setBrightness(value);
});

ipcMain.handle("set-contrast", (_event, value: number) => {
  return setContrast(value);
});

ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (_event, key, val) => {
  store.set(key, val);
});

ipcMain.on("open-devtools", () => {
  win?.webContents.openDevTools();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
