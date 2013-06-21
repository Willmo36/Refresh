/*
* No need to do anything fancy here?
* */

var socket = io.connect('http://localhost:30571');
socket.on('refresh', function () {
    window.location = window.location;
});