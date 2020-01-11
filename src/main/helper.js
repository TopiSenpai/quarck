
export default function generateKey(){
	let result = ''
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for(var i = 0; i < characters.length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}