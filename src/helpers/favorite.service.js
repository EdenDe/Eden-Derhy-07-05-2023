'use strict'

import { storageService } from './async-storage.js'

const FAVORITES_KEY = 'favoriteDB'

export const favoriteService = {
	query,
	remove,
	save,
}

function query() {
	return storageService.query(FAVORITES_KEY)
}

function remove(favoriteId) {
	return storageService.remove(FAVORITES_KEY, favoriteId)
}

function save(favorite) {
	return storageService.post(FAVORITES_KEY, favorite)
}

// function _createFavorites() {
// 	let favorites = utilService.loadFromStorage(FAVORITES_KEY) || []

// }
