var socket = io.connect('/');
	socket.on('event_from_server', function( data ){
		console.log( data.message );
		$('#message').html( data.message );
	});
	socket.on('ping', function( data ){
		console.log( data.message );
		$('#message').html( data.message );
	});