import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../helpers/favorite.service'

export const saveToFavs = createAsyncThunk('location/saveToFavs', async (locationData, { getState }) => {
	const { currLocation } = getState().location
	const location = await favoriteService.save({ ...currLocation, currWeather: locationData })
	return location
})

export const removeFromFavs = createAsyncThunk('location/removeFromFavs', async (locationData, { getState }) => {
	const { currLocation } = getState().location
	await favoriteService.remove(currLocation.id)
})

export const setFavorites = createAsyncThunk('location/setFavorites', async () => {
	return await favoriteService.query()
})

const locationSlice = createSlice({
	name: 'locationSlice',
	initialState: {
		currLocation: { name: 'tel aviv', id: '215854' },
		favorites: [],
		lastForecast: {},
	},
	reducers: {
		setCurrLocation(state, action) {
			state.currLocation = action.payload
		},
		setLastForecast(state, action) {
			state.lastForecast = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(saveToFavs.fulfilled, (state, action) => {
				state.favorites.push(action.payload)
			})
			.addCase(removeFromFavs.fulfilled, state => {
				state.favorites = state.favorites.filter(location => location.id !== state.currLocation.id)
			})
			.addCase(setFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload
			})
	},
})

export default locationSlice.reducer
export const { setCurrLocation, setLastForecast } = locationSlice.actions
