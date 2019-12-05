import dgram from 'dgram'
import net from 'net'
import ip from 'ip'
import Packet from './packets/Packet'
import PacketTypes from './packets/PacketTypes'
import DiscoverAnswerPacket from './packets/DiscoverAnswerPacket'
import DiscoverClientsPacket from './packets/DiscoverClientsPacket'
import ChannelMessagePacket from './packets/ChannelMessagePacket'
import PrivateMessagePacket from './packets/PrivateMessagePacket'


const tcp = net.createServer()
const udp = dgram.createSocket('udp4')
const clients = []
const users = []
const data = []
const messages = []

const IP = ip.address()
const ADDRESS = '255.255.255.255'
const UDP_PORT = 6969
const TCP_PORT = 9696

const PUBLICKEY = 'mxentgtrcfbueqwoxaeunut6x7ozuclz54'
const name = 'Toπ Senpai'


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
    console.log('Packet', packet)
    if(info.address === IP)
        return

    switch(packet.type) {
        case PacketTypes.ChannelMessagePacket:
            message.push(packet.data)
            break;
        case PacketTypes.DiscoverClients:
            if(users.find(u => u.key = packet.data.key) == undefined){
                users.push({
                    key: packet.data.key,
                    name: packet.data.name
                })
            }
            sendUdpPacket(new DiscoverAnswerPacket(PUBLICKEY, name, 'url', 'online'), info.address, info.port)
            break;
        
        case PacketTypes.DiscoverAnswer:
            if(users.find(u => u.key = packet.data.key) == undefined){
                users.push({
                    key: packet.data.key,
                    name: packet.data.name
                })
            }
            console.log('ANSWER')
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
    broadcastUdpPacket(new DiscoverClientsPacket(PUBLICKEY, name, 'bla', 'online', TCP_PORT))
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
    let packet = new ChannelMessagePacket(PUBLICKEY, message)
    messages.push(packet.data)
    broadcastUdpPacket(packet)
}


export default {
    data,
    clients,
    messages,
    users,
    discoverClients,
    broadcastUdpPacket,
    sendUdpPacket,
    sendMessage
}