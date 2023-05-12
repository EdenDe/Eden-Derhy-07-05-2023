export const utils = {
	makeId,
	debounce,
	regexCheckEngLettersOnly,
	getTempInCorrectUnit,
	isAnHourPassed,
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

function getTempInCorrectUnit(prefUnit, { Unit: unit, Value: temp }) {
	const res = { value: temp, unit: prefUnit }
	if (prefUnit === unit) return res
	if (prefUnit === 'F') {
		res.value = (1.8 * temp + 32).toFixed(2)
	} else {
		res.value = ((temp - 32) * (5 / 9)).toFixed(2)
	}

	return res
}

function isAnHourPassed(date) {
	const givenDate = new Date(date)
	const now = new Date()

	if (givenDate.toLocaleDateString() !== now.toLocaleDateString()) return true
	const diff = now.getTime() - givenDate.getTime()

	return diff >= 60 * 60 * 1000
}
