import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class ChannelMessagePacket extends Packet {
	
	constructor (username, message, publicKey) {
		super(PacketTypes.ChannelMessage, {username: username, text: message, id: Date.now(), time: Date.now(), publicKey: publicKey})
	}

}
