const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const Client = require("ssh2-sftp-client");
require("update-electron-app")();

let win = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "favicon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
  return win;
};

app.whenReady().then(() => {
  win = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle incoming data from credentials sent by renderer
ipcMain.handle("credentials", async (event, credentials) => {
  console.log(`Incoming event ${event}`);

  // connect to remote SFTP
  let sftp = new Client();
  await sftp.connect(credentials);
  listing = await sftp.list("/upload");

  entries = listing.map(el => el["name"]);
  console.log(entries);

  // Send sftp listing to main app window
  win.webContents.send("sftp-listing", entries);
});
