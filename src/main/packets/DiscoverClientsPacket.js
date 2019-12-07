import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class DiscoverClientsPacket extends Packet {
	
	constructor (publicKey, username, imageUrl, status, tcpPort) {
		super(PacketTypes.DiscoverClients, {key: publicKey, username: username, image: imageUrl, status: status, tcp_port: tcpPort})
	}

}
