import Packet from "./Packet";
import PacketTypes from "./PacketTypes";

export default class UserUpdatePacket extends Packet {

	constructor(publicKey, username, status) {
		super(PacketTypes.UserUpdate, { key: publicKey, username: username, status: status });
	}

}
