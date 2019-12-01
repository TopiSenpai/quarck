import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class PrivateMessagePacket extends Packet {
	
	constructor (publicKey, name, imageUrl, status) {
		super(PacketTypes.PrivateMessage, {publicKey, name, imageUrl, status})
	}

}
