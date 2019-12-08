import querystring from 'querystring'

export default class Packet {

	constructor (type, data) {
		this.type = type
		this.data = data
	}

	decode () {
		return querystring.stringify({
			type: this.type,
			data: this.data,
			time: Date.now()
		})
		
	}

}
