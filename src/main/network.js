import dgram from "dgram";
import net from "net";
import ip from "ip";

import store from "../stores/store";

import PacketTypes from "./packets/PacketTypes";
import DiscoverAnswerPacket from "./packets/DiscoverAnswerPacket";
import DiscoverClientsPacket from "./packets/DiscoverClientsPacket";
import ChannelMessagePacket from "./packets/ChannelMessagePacket";
import ChatAddPacket from "./packets/ChatAddPacket";
import UserUpdatePacket from "./packets/UserUpdatePacket";


const tcpServer = net.createServer();
const udp = dgram.createSocket("udp4");

const ADDRESS = "255.255.255.255";
const UDP_PORT = 6969;
const TCP_PORT = 9696;
const sockets = [];

/* tcpServer */

tcpServer.on("listening", () => {
	let address = tcpServer.address();
	console.log(`tcpServer server listening  on ${address.address}:${address.port}...`);
});

tcpServer.on("connection", (socket) => {
	console.log(`new connection from ${socket}`);

	socket.on("data", data => {
		console.log(data);
		let packet = JSON.parse(data);
		console.log("new Packet", packet.type, packet.data);
		switch (packet.type) {
			case PacketTypes.ChannelMessage:
				store.dispatch("addChatMessage", packet.data);
				console.log("=>", packet.data);
				break;
			case PacketTypes.ChatAdd:
				store.dispatch("addChat", packet.data.chat);
				break;
		}
	});

	socket.on("ready", () => {
		console.log("sending test");
		socket.write("test");
		socket.end();
	});

	socket.on("error", (err) => {
		console.log(`tcp2 error: ${err.stack}`);
	});
	socket.on("close", () => {
		console.log("closing socket");
		store.dispatch("updateUser", { online: false });
		let i = sockets.findIndex(s => s.address === socket.address());
		if (i !== -1) {
			sockets.splice(i, 1);
		}
	});
	sockets.push({
		key: store.getters.getUserByAddress(socket.address),
		address: socket.address(),
		socket: socket,
	});
});


tcpServer.listen(TCP_PORT);

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
			createTcpConnection(packet.data, info.address);
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

function createTcpConnection(user, address) {
	let socket = net.Socket();
	socket.connect(TCP_PORT, address);
	socket.on("data", data => {
		console.log(data);
		let packet = JSON.parse(data);
		console.log("new Packet", packet.type, packet.data);
		switch (packet.type) {
			case PacketTypes.ChannelMessage:
				store.dispatch("addChatMessage", packet.data);
				console.log("=>", packet.data);
				break;
			case PacketTypes.ChatAdd:
				store.dispatch("addChat", packet.data.chat);
				break;
		}
	});

	socket.on("ready", () => {
		console.log("sending test");
		socket.write("test");
		socket.end();
	});

	socket.on("error", err => {
		console.log(`tcp1 error: ${err.stack}`);
	});

	socket.on("close", () => {
		console.log("closing socket");
		store.dispatch("updateUser", { online: false });
		let i = sockets.findIndex(s => s.address === socket.address());
		if (i !== -1) {
			sockets.splice(i, 1);
		}
	});
	sockets.push({
		key: user.key,
		socket: socket,
		address: socket.address(),
	});
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

function sendTcpPacket(packet, key) {
	var string = packet.decode();
	let socket = sockets.find(s => s.key === key);
	if (socket !== undefined) {
		socket.write(string);
	}
}

function sendTcpPacketUsers(packet, keys) {
	var string = packet.decode();
	keys.forEach(key => {
		let socket = sockets.find(s => s.key === key);
		if (socket !== undefined) {
			socket.write(string);
			socket.flush();
		}
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
		sendTcpPacket(packet, store.getters.getUserKeys);
	} else {
		sendTcpPacketUsers(packet, store.getters.getChat(chat).users);
	}
}

function sendUserUpdate() {
	let packet = new UserUpdatePacket(getPublicKey(), getUsername(), getStatus());
	store.dispatch("updateUser", packet.data);
	broadcastUdpPacket(packet);
}

function sendAddChat(chat) {
	let packet = new ChatAddPacket(getPublicKey(), chat);
	sendTcpPacketUsers(packet, chat.users);
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
	broadcastUdpPacket,
	sendUdpPacket,
	sendMessage,
	sendUserUpdate,
	sendAddChat,
};
