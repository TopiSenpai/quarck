import dgram from 'dgram'
import net from 'net'
import Packet from './packets/Packet'
import PacketTypes from './packets/PacketTypes'
import DiscoverAnswerPacket from './packets/DiscoverAnswerPacket'
import DiscoverClientsPacket from './packets/DiscoverClientsPacket'
import ChannelMessagePacket from './packets/ChannelMessagePacket'
import PrivateMessagePacket from './packets/PrivateMessagePacket'


/* UDP */
const udp = dgram.createSocket('udp4')
const tcp = net.createServer()
const clients = []
const data = []

const ADDRESS = '255.255.255.255'
const UDP_PORT = 6969

const PUBLICKEY = 'mxentgtrcfbueqwoxaeunut6x7ozuclz54'
const name = 'Toπ'

udp.on('listening', () => {
    let address = udp.address()
    console.log(`udp server listening  on ${address.address}:${address.port}...`)
    udp.setBroadcast(true)
})

udp.on('error', (err) => {
    console.log(`udp error:\n${err.stack}`);
})

udp.on('message', (message, rInfo) => {
    console.log('message', message.toString())
    console.log('rInfo', rInfo)
    var packet = JSON.parse(message)
    console.log('Packet: ', packet)
    switch(packet.type) {
        case PacketTypes.DiscoverClients: 
            console.log(rInfo)
            break;
        
        case PacketTypes.DiscoverAnswer: 
            break;
        
    }
})

udp.bind(UDP_PORT)

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
    console.log('data received!', data)
})

tcp.listen()

const TCP_PORT = tcp.port

discoverClients()

function findClient (key) {
    return clients.find(c => c.key === key)
}

function addClient (client) {
    findClient() === undefined ? client.push() : ''
}

function discoverClients () {
    let packet = new DiscoverClientsPacket(PUBLICKEY, name, 'bla', 'online')
    console.log(packet)
    broadcastPacket(packet)
}

function broadcastPacket (packet) {
    var string = packet.decode()
    console.log('decoded', string)
    udp.send(string, 0, string.length + 1, UDP_PORT, ADDRESS)
}

function sendUdpPacket (packet, address, port = UDP_PORT) {
    var string = packet.decode()
    udp.send(string, 0, string.length + 1, port, address)
}

export default {
    data,
    clients,
    discoverClients,
    broadcastPacket
}