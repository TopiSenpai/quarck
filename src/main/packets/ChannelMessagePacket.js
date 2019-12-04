import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class ChannelMessagePacket extends Packet {
	
	constructor (publicKey, message) {
		super(PacketTypes.ChannelMessage, {username: publicKey, text: message})
	}

}
