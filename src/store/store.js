import { configureStore, combineReducers } from '@reduxjs/toolkit'
import locationReducer from './locationSlice'

const rootReducer = combineReducers({
	location: locationReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
})
