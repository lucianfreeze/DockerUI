var Docker = require('dockerode');

var docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});

function getContainerIds() {
  var cnts = [];
  docker.listContainers(function (err, containers) {
    containers.forEach(function(err, cntrInfo) {
      cnts.push(containers[cntrInfo].Id);
    })
  });
  console.log(cnts)
  return cnts;
}

function getContainerNames() {
  docker.listContainers(function (err, containers) {
    containers.forEach(function(err, cntrInfo) {
      console.log(containers[cntrInfo].Names[0]);
    })
  });
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
  var test = getContainerIds();
  containerStartStop(0);
}
