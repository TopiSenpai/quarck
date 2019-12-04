import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class DiscoverClientsPacket extends Packet {
	
	constructor (publicKey, name, imageUrl, status, tcpPort) {
		super(PacketTypes.DiscoverClients, {key: publicKey, name: name, image: imageUrl, status: status, tcp_port: tcpPort})
	}

}
