
function savingData(){
	var socket = io.connect()

	socket.emit('savingData',true); 

}