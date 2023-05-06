export const utils = {
	makeId,
	debounce,
	regexCheckEngLettersOnly,
	getTempInCorrectUnit,
}

function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

function debounce(func, timeout = 300) {
	let timer

	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function regexCheckEngLettersOnly(value) {
	return !/^[a-zA-Z]+$/.test(value)
}

function getTempInCorrectUnit(prefUnit, unit, temp) {
	if (prefUnit === unit) return temp
	if (prefUnit === 'F') {
		return (1.8 * temp + 32).toFixed(2)
	}
	return ((temp - 32) * (5 / 9)).toFixed(2)
}
