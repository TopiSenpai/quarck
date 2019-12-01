import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class DiscoverClientsPacket extends Packet {
	
	constructor (publicKey, name, imageUrl, status) {
		super(PacketTypes.DiscoverAnswer, {publicKey, name, imageUrl, status})
	}

}
