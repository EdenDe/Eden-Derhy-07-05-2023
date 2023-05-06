import Cookies from 'js-cookie'

export const userPrefService = {
	setCookie,
	getCookie,
}

export const TEMP_UNIT_KEY = 'tempUnit'
export const MODE_KEY = 'mode'

function setCookie(cookieName, cookieValue) {
	Cookies.set(cookieName, cookieValue)
}

function getCookie(cookieName) {
	let cookieValue = Cookies.get(cookieName)
	if (cookieValue) return cookieValue

	return cookieName === 'mode' ? _getInitMode() : _getInitTempUnit()
}

function _getInitMode() {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

const _getInitTempUnit = () => {
	const fahrenheitLanguages = ['en-US', 'en-BZ', 'en-KY', 'es-PR']
	const userLanguage = navigator.language || navigator.userLanguage
	return fahrenheitLanguages.includes(userLanguage) ? 'F' : 'C'
}
