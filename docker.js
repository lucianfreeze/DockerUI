/**
 * @fileoverview The file that holds all the Dockerode Node module
 * and functionality to the electron application
 * @author Lucian Freeze
 * @author Garrett Hay
 * @author Brett Whitson
 * 
 * @requires NPM:node_modules
 * 
 */
var Docker = require('dockerode');

var docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});

var containerList;

var item = document.getElementById("item-1").childNodes.childNodes.childNodes;

console.log(item);

/**
 * Queries Docker for a list of ContainerInfo and 
 * initialize a global list to it
 * 
 */
function getContainerIds() {
  docker.listContainers(function (err, containers) {
      containerList = containers;
      console.log(containerList);
  })
}

//id        = containerList[0].Id       /123eidhf3i2k2h2
//Name      = containerList[0].Names[0] /Tester1
//State     = containerList[0].State    /running
//Status    = containerList[0].Status   /Up 2 minutes
//Command   = containerList[0].Command  /"/bin/sh"
//image     = containerList[0].Image    /alpine:lastest


/**
 * Queries Docker for the list of its held ContainerInfo.
 * It then pushes them to a global list 
 */
function getContainerNames() {
  docker.listContainers(function (err, containers) {
    containers.forEach(function(err, cntrIdx) {
      containerList.push(containers[cntrIdx]);
    })
  });
}

/**
 * Takes the Id of a Container,
 *  Checks if it is running or not,
 *  and then toggle that state of the container
 * 
 * @param {string} IdName The ID of the Container chosen
 */
function containerStartStop(IdName) {
    let container = docker.getContainer(IdName);
    container.inspect(function (err, data) {
        console.log(data.State.Status);
        if (data.State.Running) { container.stop(); }
      else { container.start(); }
    });
}

/**
 * Kills a specifed Container, by ID, if running and then
 * removes the container from Docker
 * 
 * @param {*} IdName
 */
function containerDestroy(IdName) {
    let container = docker.getContainer(IdName);
    container.inspect(function (err, data) {
        if (data.State.Running) { 
            container.kill(function (err) {
                container.remove(function (err) {
                    console.log('container removed');
                });poopoo
            }); 
        }
        else { container.remove(function (err) {
            console.log('container removed');
            }); 
        }
    })
}
