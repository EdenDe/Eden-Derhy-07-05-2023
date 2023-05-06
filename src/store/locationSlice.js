import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../helpers/favoriteService'
import { toast } from 'react-toastify'
import { weatherApi } from '../helpers/weatherApi'

export const saveToFavs = createAsyncThunk(
	'location/saveToFavs',
	async (locationData, { getState, rejectWithValue }) => {
		try {
			const currLocation = { ...getState().location.currLocation }
			debugger
			delete currLocation.forecast
			return await favoriteService.save(currLocation)
		} catch (error) {
			console.log(error)
			toast.error('could not save the location')
			return rejectWithValue('could not save the location')
		}
	}
)

export const removeFromFavs = createAsyncThunk(
	'location/removeFromFavs',
	async (locationData, { getState, rejectWithValue }) => {
		try {
			const { currLocation } = getState().location
			await favoriteService.remove(currLocation.id)
		} catch (error) {
			console.log(error)
			toast.error('could not remove the location')
			return rejectWithValue('could not remove the location')
		}
	}
)

export const setCurrLocation = createAsyncThunk(
	'location/setCurrLocation',
	async (locationData, { rejectWithValue, getState }) => {
		try {
			const isMetric = getState().userPref.tempUnit === 'C'
			const [currWeather, forecast] = await Promise.all([
				weatherApi.getCurrWeather(locationData.id, isMetric),
				weatherApi.getForecasts(locationData.id, isMetric),
			])

			return {
				name: locationData.name,
				id: locationData.id,
				currWeather,
				forecast,
			}
		} catch (error) {
			console.error(error)
			return rejectWithValue('could not save the location')
		}
	}
)

export const setFavorites = createAsyncThunk('location/setFavorites', async () => {
	try {
		return await favoriteService.query()
	} catch (error) {
		console.log(error)
	}
})

const locationSlice = createSlice({
	name: 'locationSlice',
	initialState: {
		currLocation: {},
		status: 'idle',
		favorites: [],
	},
	reducers: {
		loadLocation(state) {
			state.status = 'success'
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
			.addCase(setCurrLocation.pending, state => {
				state.status = 'loading'
			})
			.addCase(setCurrLocation.fulfilled, (state, action) => {
				state.status = 'success'
				state.currLocation = action.payload
			})
			.addCase(setCurrLocation.rejected, state => {
				state.status = 'failed'
			})
	},
})

export default locationSlice.reducer
export const { loadLocation } = locationSlice.actions
