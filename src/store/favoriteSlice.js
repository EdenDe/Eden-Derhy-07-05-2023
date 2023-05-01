import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../services/favorite.service'

export const addLocation = createAsyncThunk('favorite/addLocation', async (locationData, thunkAPI) => {
	const location = await favoriteService.save(locationData)
	return location
})

export const removeLocation = createAsyncThunk('favorite/removeLocation', async (locationData, thunkAPI) => {
	await favoriteService.remove(locationData)
	return locationData
})

const favoriteSlice = createSlice({
	name: 'favoriteSlice',
	initialState: {
		favorites: [],
	},
	reducers: {
		// addLocation: async (state, action) => {
		// 	console.log('hello', action.payload)
		// 	const location = await favoriteService.save(action.payload)
		// 	debugger
		// 	state = { ...state, favorites: [...state.favorites, location] }
		// },
		// removeLocation: async (state, action) => {
		// 	console.log('hello', action.payload)
		// 	await favoriteService.remove(action.payload)
		// 	state = { ...state, favorites: state.favorites.filter(location => location.id !== action.payload) }
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(addLocation.fulfilled, (state, action) => {
				state.favorites.push(action.payload)
			})
			.addCase(removeLocation.fulfilled, (state, action) => {
				state.favorites = state.favorites.filter(location => location.id !== action.payload)
			})
	},
})

export default favoriteSlice.reducer
//export const { addLocation, removeLocation } = favoriteSlice.actions
// Other code such as selectors can use the imported `RootState` type
