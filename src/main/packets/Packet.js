import PacketTypes from './Packet'

export default class Packet {

	constructor (type, data) {
		this.type = type
		this.data = data
	}

	decode () {
		return JSON.stringify({
			type: this.type,
			data: this.data,
			time: Date.now()
		})
	}

}
