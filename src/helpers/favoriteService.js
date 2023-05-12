import { storageService } from './asyncStorage.js'

const FAVORITES_KEY = 'favoriteDB'

export const favoriteService = {
	query,
	remove,
	save,
	update,
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

function update(favorite) {
	return storageService.put(FAVORITES_KEY, favorite)
}
