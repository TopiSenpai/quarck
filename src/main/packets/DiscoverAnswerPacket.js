import Packet from "./Packet";
import PacketTypes from "./PacketTypes";

export default class DiscoverAnswerPacket extends Packet {
	
	constructor (publicKey, username, imageUrl, status) {
		super(PacketTypes.DiscoverAnswer, {key: publicKey, username: username, image: imageUrl, status: status});
	}

}
