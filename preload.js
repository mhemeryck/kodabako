const { contextBridge, ipcRenderer } = require("electron");

// Bridge between main and sandboxed renderer code
contextBridge.exposeInMainWorld("api", {
  // Send data from window to main
  send: (channel, data) => ipcRenderer.invoke(channel, data),
  // Send data from main to window
  receive: (channel, func) => {
    ipcRenderer.on(channel, (_, ...args) => func(...args));
  }
});
