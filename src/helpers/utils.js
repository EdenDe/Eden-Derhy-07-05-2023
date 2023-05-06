export const utils = {
	makeId,
	debounce,
	regexCheckEngLettersOnly,
	isDateBeforeToday,
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

function isDateBeforeToday(date) {
	return new Date(new Date(date).toDateString()) < new Date(new Date().toDateString())
}
