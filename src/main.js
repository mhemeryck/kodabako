const { app, ipcMain, BrowserWindow, autoUpdater } = require("electron");
const path = require("path");
const Client = require("ssh2-sftp-client");
const { setInterval } = require("timers");

// Auto update
const server = "http://10.0.2.2:5000";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url });

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000);

// Only launch once under windows
if (require("electron-squirrel-startup")) {
  return app.quit();
}

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

// Send app version when requested
ipcMain.handle("get-app-version", async () => {
  win.webContents.send("app-version", app.getVersion());
});
