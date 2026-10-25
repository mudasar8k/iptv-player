'use strict';
if (process.platform == 'win32')
  process.env['VLC_PLUGIN_PATH'] = require('path').join(__dirname, '../../wcjs-prebuilt/plugins'); // make sure ../../ is there


const session = require('electron')


const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const url = require('url')
const path = require('path')
const Menu = require('electron').Menu

var mainWindow = null;


// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  // Create the browser window.
  var iconPath = path.join(__dirname, 'favicon.ico');

  mainWindow = new BrowserWindow({
    title: "VLC IPTV",
    icon: iconPath,
    width: 1300,
    height: 900,
    frame: true,
    autoHideMenuBar: true,
    // fullscreen: false,
    minWidth: 1280,
    minHeight: 720

  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }), {
    userAgent: 'IPTVSmartersPro'
  });

  // console.log(mainWindow.webContents.getUserAgent());

  // mainWindow.on('close', function (e) {
  //   var choice = require('electron').dialog.showMessageBox(this,
  //     {
  //       type: 'question',
  //       buttons: ['Yes', 'No'],
  //       title: 'Confirm',
  //       message: 'Are you sure you want to quit?',
  //       icon: path.join(__dirname, 'icon.png')
  //     });
  //   if (choice == 1) {
  //     e.preventDefault();
  //   }
  // });

  // mainWindow.setFullScreen(true);

  // createMenu(); 

  mainWindow.openDevTools({ detach: false });

});

app.on('window-all-closed', () => {
  app.quit()
})

// session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders['User-Agent'] = 'SuperDuperAgent';
//   callback({ cancel: false, requestHeaders: details.requestHeaders });
// });

function createMenu() {
  const application = {
    label: "VLC IPTV",
    submenu: [
      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => {
          app.quit()
        }
      }
    ]
  }

  const about = {
    label: "About",
    submenu: [
      {
        label: "VLC IPTV is a Live IPTV player"
      },
      {
        label: "for end-users that provides the facility"
      },
      {
        label: "to watch Live TV, VOD, Series."
      },
      {
        label: " ",
      },
      {
        label: "                                         Varsion: 1.2.0",
      }
    ]
  }

  const edit = {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  }

  const template = [
    application,
    edit,
    about
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}