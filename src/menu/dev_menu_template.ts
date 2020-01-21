import { app, BrowserWindow } from "electron";

export const devMenuTemplate = {
    label: "Development",
    submenu: [
        {
            label: "Reload",
            accelerator: "Alt+CmdOrCtrl+R",
            click: () => {
                BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        },
        {
            label: "Toggle DevTools",
            accelerator: "Alt+CmdOrCtrl+I",
            click: () => {
                // @ts-ignore
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        },
        {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q",
            click: () => {
                app.quit();
            }
        }
    ]
};
