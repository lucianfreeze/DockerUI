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

/**
 * main importation of dockerode
 * @type {Dockerode}
 */
var Docker = require('dockerode');

/**
 * jQuery importation for main window
 * @constant
 * 
 * @type {globalThis}
 */
window.$ = window.jQuery = require('jquery');

/**
 * main container information list of program
 * @type {List<ContainerInfo>}
 */
var containerList;

/**
 * The main dockerode connection.
 * @constant
 * 
 * @type {Dockerode}
 */
var docker = new Docker({
  host: '127.0.0.1',
  port: 2375
});

$(function () {
  getContainerIds();
  setTimeout(() => {
    if (!containerList) {
      $("body").html("<h1 class='error'>No Containers</h1>");
    }
    else {
      containerList.forEach(function(container){
        $newItem = $("#list-header").clone().attr("id","item-"+getItemNum());
        $newItem.find(".id").text(container.Id.slice(0,12));
        $newItem.find(".name").text(container.Names[0]);
        $newItem.find(".status").text(container.Status);
        $newItem.find(".state").text(container.State);
        $newItem.find(".cmd").text(container.Command);

        $("#container-list").append($newItem);
      })
    }
  }, 100);

})

/**
 * Acquire number of items in container-list
 * 
 * @returns {number}
 */
function getItemNum() {
  return $("#container-list").length;
}

/**
 * Queries Docker for a list of ContainerInfo and 
 * initialize a global list to it
 * 
 */
function getContainerIds() {
  docker.listContainers({"all":"true"}, function (err, containers) {
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
    containers.forEach(function (err, cntrIdx) {
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
                });
            }); 
        }
        else { container.remove(function (err) {
            console.log('container removed');
            }); 
        }
    })
}

/**
 * Creates a Container in Docker with specific options
 * //for now only a static alpine container
 * 
 * 
 */
function createContainer() {
  var nextContainer;
  docker.createContainer({
    Image: 'alpine:latest',
    Names: 'TestButtoner',
    Tty: true,
    Cmd: ['/bin/sh', '-c', 'echo "Hello from Docker Alphine"'],
    }, function(err, container) {
      nextContainer = container;
      return nextContainer.start();
    }
  );
}
