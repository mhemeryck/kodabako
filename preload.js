const { contextBridge, ipcRenderer } = require("electron");

// Bridge between main and sandboxed renderer code
contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => ipcRenderer.invoke(channel, data)
});
