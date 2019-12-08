import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class ChannelMessagePacket extends Packet {
	
	constructor (publicKey, message, chat) {
		super(PacketTypes.ChannelMessage, {public_key: publicKey, text: message, chat: chat, time: Date.now()})
	}

}
