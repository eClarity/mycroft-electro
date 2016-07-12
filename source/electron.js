const electron = require('electron');
const {app} = electron;

const {BrowserWindow} = electron;

let win;

global.sharedObject = {args: process.argv}

function createWindow() {

  var windowConfig = {};

  windowConfig.frame = false;
  windowConfig.width = 400;
  windowConfig.height = 700;
  windowConfig.title = "Mycroft UI v0.0";

  if (process.argv[2] === 'test') {
    windowConfig.frame = true;
  }


  win = new BrowserWindow( windowConfig );

  win.loadURL('file://'+__dirname+'/index.html');

};

app.on('ready', createWindow);
