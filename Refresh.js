var refresh = function(){
	var count = 0,
		files = [],
		browsers = [],
		fs = require('fs'),
		io = require('socket.io').listen(30571);

	process.argv.forEach(function(item,index)
	{
		if (index > 1)
			files.push(item);
	});

	console.log("Watching...");

	for (var i = 0; i < files.length; i++)
	{
		fs.watchFile(files[i], function () {
			count++;
			console.log(count + " refreshes.");
			if (browsers.length > 0)
			{
				for (var s = 0; s < browsers.length; s++)
				{
					browsers[s].emit('refresh',{});
				}
			}
		});
	}

	io.sockets.on('connection',function(socket){
		browsers.push(socket);
	   console.log(browsers.length + ' browsers connected');

		socket.on('disconnect',function(){
		   browsers.splice(socket);
		   console.log(browsers.length + ' browsers connected');
		});
	});
};

module.exports = refresh();