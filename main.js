const { app, BrowserWindow } = require('electron');

const path = require('path');

const http = require('http');

const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true
    }
  });

const server = exec('npm start');

  const checkServer = () => {
    http.get('http://localhost:3000', (res) => {
      if (res.statusCode === 200) {
        win.loadURL('http://localhost:3000');
      } else {
        setTimeout(checkServer, 500);
      }
    }).on('error', () => {
      setTimeout(checkServer, 500);
    });
  };

  checkServer();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
