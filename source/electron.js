const electron = require('electron');
const {app} = electron;

const {BrowserWindow} = electron;
const {ipcMain} = require('electron');

global.sharedObject = {args: process.argv}

function createMainWindow() {
  var win;
  var windowConfig = {};

  windowConfig.frame = false;
  windowConfig.width = 400;
  windowConfig.height = 700;
  windowConfig.title = "Mycroft UI v0.0";

  if (process.argv[2] === 'test') {
    windowConfig.frame = true;
    windowConfig.width = 800;
  }

  win = new BrowserWindow( windowConfig );

  win.loadURL('file://'+__dirname+'/index.html');
};

app.on('ready', function () {
  createMainWindow();

});

ipcMain.on('show-google', function () {
  var googleWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })

  googleWindow.loadURL('http://www.google.com');

  googleWindow.show();
})
