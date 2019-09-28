var Docker = require('dockerode');

var docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function getContainerFromName() {
  console.log(docker.getContainers());
}

function getContainerId() {
  let here = "dd"
  docker.listContainers(function (err, containers) {
     here = containers[0].Id;
  });
  console.log(here);
}

function containerStartStop(conNum) {
  docker.listContainers(function (err, containers) {
    var con = docker.getContainer(containers[conNum].Id);
    con.inspect(function (err, data) {
      console.log(data.State.Status);
    });
  });
  /*

  var container = docker.getContainer(conId);
  console.log(conId);
  console.log(container);
  //container.inspect(function (err,data) {
  //  console.log(data);
  //});
  */
}

function testData() {
  var test = getContainerId();
  containerStartStop(0);
}
