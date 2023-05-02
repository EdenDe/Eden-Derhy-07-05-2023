'use strict'

export const storageService = {
	query,
	get,
	post,
	remove,
}

function query(entityType, delay = 500) {
	var entities = JSON.parse(localStorage.getItem(entityType)) || []
	return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
	return query(entityType).then(entities => {
		const entity = entities.find(entity => entity._id === entityId)
		if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
		return entity
	})
}

async function post(entityType, newEntity) {
	newEntity = JSON.parse(JSON.stringify(newEntity))
	return query(entityType).then(entities => {
		entities.push(newEntity)
		_save(entityType, entities)
		return newEntity
	})
}

async function remove(entityType, entityId) {
	return query(entityType).then(entities => {
		const idx = entities.findIndex(entity => entity.id === entityId)
		if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
		entities.splice(idx, 1)
		_save(entityType, entities)
	})
}

// Private functions

function _save(entityType, entities) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}
