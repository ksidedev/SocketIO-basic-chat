var socket = io();

function getMessage() {
	console.log('Connected to server');
  	var name = document.getElementById('name')
  	var message = document.getElementById('message')

  	document.getElementById('submit').onclick = function(){
  		console.log(name.value, message.value)
        socket.emit('createMessage', {
		    from: name.value,
		    text: message.value
	  	});
	}
}

socket.on('connect', function () {
  getMessage()
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

socket.on('updatedMessage', function (message) {
	$('.message').append( "<div>"
		+		"<p>" + "<b>" + message.from + "</b>" + ' @' + message.createdAt + "</p>"
		+ 		"<p>" + message.text + "</p>"
		+ 	"</div>" );
  	console.log('updatedMessage', message);
});
