var refresh = function () {
	var count = 0,
		directory = '',
		browsers = [],
		fs = require('fs'),
        chokidar = require('chokidar'),
		io = require('socket.io').listen(30571,{log: false});

	process.argv.forEach(function(item,index)
	{
		if (index > 1)
			directory = item
	});

    var watcher = chokidar.watch(directory, {ignored: /^\./, persistent: true});
    watcher.on("add",emitRefresh);
    watcher.on("change",emitRefresh);
    watcher.on("unlink",emitRefresh);
    watcher.on("error",function(err){
        console.log("something went wrong with the file watching.. " + err);
    });
    
	console.log("Watching...");    
    
	io.sockets.on('connection',function(socket){
		browsers.push(socket);
	   console.log(browsers.length + ' browsers connected');

		socket.on('disconnect',function(){
		   browsers.splice(socket);
		   console.log(browsers.length + ' browsers connected');
		});
	});
    
    console.log("Listening...")
    
    function emitRefresh (){
    if (browsers.length > 0)
			{
                console.log("refreshing");
				for (var s = 0; s < browsers.length; s++)
				{
					browsers[s].emit('refresh',{});
				}
			}
}

};

module.exports = refresh();