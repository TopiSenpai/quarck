import Packet from './Packet'
import PacketTypes from './PacketTypes'

export default class DiscoverAnswerPacket extends Packet {
	
	constructor (publicKey, name, imageUrl, status) {
		super(PacketTypes.DiscoverAnswer, {key: publicKey, name: name, image: imageUrl, status: status})
	}

}
