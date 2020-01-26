import dgram from "dgram";
import ip from "ip";

import crypto from "crypto";

import store from "../stores/store";
import Store from "electron-store";
import generateKey from "./helper";

import PacketTypes from "./packets/PacketTypes";
import DiscoverAnswerPacket from "./packets/DiscoverAnswerPacket";
import DiscoverClientsPacket from "./packets/DiscoverClientsPacket";
import ChannelMessagePacket from "./packets/ChannelMessagePacket";
import ChatAddPacket from "./packets/ChatAddPacket";
import UserUpdatePacket from "./packets/UserUpdatePacket";


const udp = dgram.createSocket("udp4");

const ADDRESS = "255.255.255.255";
const UDP_PORT = 6969;

/* user data */

const config = new Store();

if (!config.has("username")) {
	let username = `user#${(Math.random() * 10000).toString().substring(0, 4)}`;
	config.set("username", username);
}
store.dispatch("username", config.get("username"));

if (!config.has("private_key") || config.get("private_key") === "" || !config.has("public_key") || config.get("public_key") === "") {
	config.set("private_key", generateKey());
	config.set("public_key", generateKey());
}
store.dispatch("privateKey", config.get("private_key"));
store.dispatch("publicKey", config.get("public_key"));


/* UDP */

udp.on("listening", () => {
	let address = udp.address();
	udp.setBroadcast(true);
	console.log(`udp server listening  on ${address.address}:${address.port}...`);
});

udp.on("error", (err) => {
	console.log(`udp error:\n${err.stack}`);
});

udp.on("message", (message, info) => {
	var packet = JSON.parse(message);
	if (info.address === ip.address())
		return;

	console.log("new Packet", packet.type, packet.data);
	switch (packet.type) {
		case PacketTypes.ChannelMessage:
			store.dispatch("addChatMessage", packet.data);
			console.log("=>", packet.data);
			break;
		case PacketTypes.ChatAdd:
			store.dispatch("addChat", packet.data.chat);
			break;
		case PacketTypes.DiscoverClients:
			packet.data.address = info.address;
			packet.data.online = true;
			store.dispatch("user", packet.data);
			sendUdpPacket(new DiscoverAnswerPacket(getPublicKey(), getUsername(), "image", getStatus()), info.address, info.port);
			break;

		case PacketTypes.DiscoverAnswer:
			packet.data.address = info.address;
			store.dispatch("user", packet.data);
			break;

		case PacketTypes.UserUpdate:
			packet.data.address = info.address;
			packet.data.online = true;
			store.dispatch("updateUser", packet.data);
			break;

	}
});

udp.bind(UDP_PORT);

discoverClients();

function discoverClients() {
	store.dispatch("user", { key: getPublicKey(), username: getUsername(), image: "blaaa", status: getStatus(), address: ip.address() });
	broadcastUdpPacket(new DiscoverClientsPacket(getPublicKey(), getUsername(), "bla", getStatus()));
}

function broadcastUdpPacket(packet) {
	var string = packet.decode();
	udp.send(string, 0, string.length + 1, UDP_PORT, ADDRESS);
}

function broadcastUdpPacketUsers(packet, users) {
	var string = packet.decode();
	users.forEach(u => {
		console.log("key:", u);
		let user = store.getters.getUser(u);
		udp.send(string, 0, string.length + 1, UDP_PORT, user.address);
	});
}

function sendUdpPacket(packet, address, port = UDP_PORT) {
	var string = packet.decode();
	udp.send(string, 0, string.length + 1, port, address);
}

function sendMessage(message, chat) {
	let packet = new ChannelMessagePacket(getPublicKey(), message, chat);
	store.dispatch("addChatMessage", packet.data);
	console.log("<=", packet.data);
	if (chat === "public") {
		broadcastUdpPacket(packet, store.getters.getUsers);
	} else {
		broadcastUdpPacketUsers(packet, store.getters.getChat(chat).users);
	}
}

function sendUserUpdate() {
	let packet = new UserUpdatePacket(getPublicKey(), getUsername(), getStatus());
	store.dispatch("updateUser", packet.data);
	broadcastUdpPacket(packet);
}

function sendAddChat(chat) {
	let packet = new ChatAddPacket(getPublicKey(), chat);
	broadcastUdpPacketUsers(packet, chat.users);
	store.dispatch("addChat", chat);
}

function getPublicKey() {
	return store.getters.getPublicKey;
}

function getStatus() {
	return store.getters.getStatus;
}

function getUsername() {
	return store.getters.getUsername;
}

export default {
	discoverClients,
	sendUdpPacket,
	sendMessage,
	sendUserUpdate,
	sendAddChat,
};
