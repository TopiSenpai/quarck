import dgram from 'dgram'
import net from 'net'
import ip from 'ip'

import store from '../stores/store'

import Packet from './packets/Packet'
import PacketTypes from './packets/PacketTypes'
import DiscoverAnswerPacket from './packets/DiscoverAnswerPacket'
import DiscoverClientsPacket from './packets/DiscoverClientsPacket'
import ChannelMessagePacket from './packets/ChannelMessagePacket'
import PrivateMessagePacket from './packets/PrivateMessagePacket'


const tcp = net.createServer()
const udp = dgram.createSocket('udp4')
const clients = []

const IP = ip.address()
const ADDRESS = '255.255.255.255'
const UDP_PORT = 6969
const TCP_PORT = 9696

const PUBLICKEY = 'mxentgtrcfbueqwoxaeunut6x7ozuclz54'
const username = 'Toπ Senpai'


/* TCP */

tcp.on('listening', () => {
    let address = tcp.address()
    console.log(`tcp server listening  on ${address.address}:${address.port}...`)
})

tcp.on('connection', (connection) => {
    console.log(`new connection from ${connection}`)
})

tcp.on('error', (err) => {
    console.log(`tcp error:\n${err.stack}`)
})

tcp.on('data', (data) => {
    console.log('tcp data received!', data)
})

tcp.listen(TCP_PORT)

function sendTcpPacket (packet, address, port = TCP_PORT) {
    var string = packet.decode()
    tcp.send(string, 0, string.length + 1, port, address)
}

/* UDP */

udp.on('listening', () => {
    let address = udp.address()
    udp.setBroadcast(true)
    console.log(`udp server listening  on ${address.address}:${address.port}...`)
})

udp.on('error', (err) => {
    console.log(`udp error:\n${err.stack}`);
})

udp.on('message', (message, info) => {
    var packet = JSON.parse(message)
    if(info.address === IP)
        return
        
    console.log('Packet', packet)

    switch(packet.type) {
        case PacketTypes.ChannelMessagePacket:
            store.commit('message', packet.data)
            break;
        case PacketTypes.DiscoverClients:
            store.commit('user', packet.data)
            sendUdpPacket(new DiscoverAnswerPacket(PUBLICKEY, username, 'url', 'online'), info.address, info.port)
            break;
        
        case PacketTypes.DiscoverAnswer:
            store.commit('user', packet.data)
            break;
        
    }
})

udp.bind(UDP_PORT)



discoverClients()

function findClient (key) {
    return clients.find(c => c.key === key)
}

function addClient (client) {
    if(findClient() === undefined) {
        client.push()
    }
}

function discoverClients () {
    broadcastUdpPacket(new DiscoverClientsPacket(PUBLICKEY, username, 'bla', 'online', TCP_PORT))
}

function broadcastUdpPacket (packet) {
    var string = packet.decode()
    udp.send(string, 0, string.length + 1, UDP_PORT, ADDRESS)
}

function sendUdpPacket (packet, address, port = UDP_PORT) {
    var string = packet.decode()
    udp.send(string, 0, string.length + 1, port, address)
}

function sendMessage (message) {
    let packet = new ChannelMessagePacket(username, message, PUBLICKEY)
    store.commit('message', packet.data)
    console.log('packet', packet.data)
    broadcastUdpPacket(packet)
}


export default {
    discoverClients,
    broadcastUdpPacket,
    sendUdpPacket,
    sendMessage
}