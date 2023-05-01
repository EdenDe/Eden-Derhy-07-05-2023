import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favoriteReducer from './favoriteSlice'
import { weatherApi } from './apiSlice'

const rootReducer = combineReducers({
	favorite: favoriteReducer,
	[weatherApi.reducerPath]: weatherApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware),
})
