import Packet from "./Packet";
import PacketTypes from "./PacketTypes";

export default class ChannelAddPacket extends Packet {

	constructor(publicKey, chat) {
		super(PacketTypes.ChatAdd, { key: publicKey, chat: chat });
	}

}
