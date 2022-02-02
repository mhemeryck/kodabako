const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const Client = require("ssh2-sftp-client");

let sftp = new Client();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "favicon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
  return win;
};

app.whenReady().then(() => {
  app.win = createWindow();

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
  console.log(`${event}: ${credentials}`);

  // connect to remote SFTP
  await sftp.connect(credentials);
  listing = await sftp.list("/");
  console.log(listing);

  // Send sftp listing to main app window
  app.win.webContents.send('sftp-listing', listing);
});
