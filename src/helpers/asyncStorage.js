export const storageService = {
	query,
	post,
	put,
	remove,
}

function query(entityType, delay = 500) {
	var entities = JSON.parse(localStorage.getItem(entityType)) || []
	return new Promise(resolve => setTimeout(() => resolve(entities), delay))
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
		if (idx < 0)
			throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
		entities.splice(idx, 1)
		_save(entityType, entities)
	})
}

async function put(entityType, updatedEntity) {
	updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
	return query(entityType).then(entities => {
		const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
		if (idx < 0)
			throw new Error(
				`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`
			)
		entities.splice(idx, 1, updatedEntity)
		_save(entityType, entities)
		return updatedEntity
	})
}

function _save(entityType, entities) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}
