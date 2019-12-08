export default class Packet {

	constructor (type, data) {
		this.type = type
		this.data = data
	}

	decode () {
		return rawurlencode(
			JSON.stringify({
				type: this.type,
				data: this.data,
				time: Date.now()
			})
		)
	}

}
