import { configureStore, combineReducers } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'
import userPrefReducer from './userPrefSlice'

const rootReducer = combineReducers({
	location: locationReducer,
	userPref: userPrefReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
