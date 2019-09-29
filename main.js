/**
 * @fileoverview The main.js file to house and
 * run electron and application from.
 * @author Lucian Freeze
 * @author Garrett Hay
 * @author Brett Whitson
 * 
 * @requires NPM:node_modules
 * 
 */

 /**
 * main importation of Electron
 * @constant
 * 
 * @type {Electron}
 */
const {app, BrowserWindow} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

/**
 * global reference of window object
 * @type {Electron.BrowserWindow}
 */
let win;

/**
 * Creates the specification of a browser window,
 * allows node integration into the window,
 * loads the html into the electron app,
 * opens Developer's tools,
 * and what to do when window is closed.
 */
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Open the DevTools.
  win.webContents.openDevTools();


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    app.quit();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

/**
 * if statement for starting application.
 * as long as app exist it starts with createWindow method.
 * When all windows are closed the application quits.
 * when application activates run createWindow method.
 */
if (app != null) {
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.