var Docker = require('dockerode');

var containerList;

var docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});

function getContainerIds() {
  var cnts = [];
  docker.listContainers(function (err, containers) {
      containerList = containers;
      console.log(containerList);
  })
}

function getContainerNames() {
  docker.listContainers(function (err, containers) {
    containers.forEach(function(err, cntrIdx) {
      containerList.push(containers[cntrIdx]);
    })
  });
}

function containerStartStop(IdName) {
  docker.listContainers(function (err, containers) {
    let container = docker.getContainer(IdName);
    container.inspect(function (err, data) {
      console.log(data.State.Status);
      if (data.State.Running) {
          container.stop();
      }
      else {
          container.start();
      }
    });
  });

  function containerDestroy(IdName) {
      let container = docker.getContainer(IdName);
      container.inspect(function (err, data) {
          if (data.State.Running) {
              container.kill();
          }
          container.remove();
          console.log('container removed');
      })
      container
  }
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
  var test = getContainerIds();
  containerStartStop(0);
}
