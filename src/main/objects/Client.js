import net from 'net'
class Client {

	constructor(key, address, port){
		this.key = key
		this.address = address
		this.port = port

		this.socket = new net.Socket();

		socket.connect(1337, '127.0.0.1', function() {
			console.log('Connected')
			client.write('Hello, server! Love, Client.')
		})

		socket.on('data', function(data) {
			console.log('Received: ' + data)
		})

		socket.on('close', function() {
			console.log('Connection closed')
		})
	}
}