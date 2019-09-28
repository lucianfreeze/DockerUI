var Docker = require('dockerode');

var docker = new Docker({
    host: '127.0.0.1',
    port: process.env.DOCKER_PORT || 2375
})

docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
      console.log(docker.getContainer(containerInfo.Id));
    });
  })

docker.listContainers({all: true}, function(err, containers) {
  console.log('ALL: ' + containers.length);
});

docker.listContainers({all: false}, function(err, containers) {
  console.log('!ALL: ' + containers.length);
});

// filter by labels
var opts = {
  "limit": 3,
  "filters": '{"label": ["staging","env=green"]}'
};

// maps are also supported (** requires docker-modem 0.3+ **)
opts["filters"] = {
  "label": [
    "staging",
    "env=green"
  ]
};

docker.listContainers(opts, function(err, containers) {
  console.log('Containers labeled staging + env=green : ' + containers.length);
});