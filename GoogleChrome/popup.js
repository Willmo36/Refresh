
var started = false;
var socket;
var refreshing = false;
var tabs = [];

if (refreshing == true)
{
    connect();
}
chrome.browserAction.onClicked.addListener(function(tab) {    
    if (started == false){        
        connect();     
        alert("connected");
        started = true;
    }else{
        start=true;
        socket.disconnect();         
        console.log("disconnect");
    }    
});


function connect(){    
    socket = io.connect('http://localhost:30571',function(err,data)
                        {
                            alert(err);
                            alert(data);
                        });
    
    socket.on('refresh', function () {
        alert("refreshing");
        refreshing = true;
        window.location = window.location;        
    });
}
