import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class ChannelMessagePacket extends Packet {
	
	constructor (publicKey, name, imageUrl, status) {
		super(PacketTypes.ChannelMessage, {publicKey, name, imageUrl, status})
	}

}
