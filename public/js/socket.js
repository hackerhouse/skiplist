var socket = io.connect('/');
	socket.on('event_from_server', function( data ){
		console.log( data.message );
		$('#message').html( data.message );
	});
	socket.on('reload', function( data ){
		console.log( data.message );
		$('#message').html( data.message );
	});