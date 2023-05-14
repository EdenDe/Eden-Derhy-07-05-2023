import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { favoriteService } from '../helpers/favoriteService'
import { toast } from 'react-toastify'
import { weatherApi } from '../helpers/weatherApi'
import { utils } from '../helpers/utils'

export const saveToFavs = createAsyncThunk(
	'location/saveToFavs',
	async (locationData, { getState, rejectWithValue }) => {
		try {
			const currLocation = { ...getState().location.currLocation }

			delete currLocation.forecast
			return await favoriteService.save(currLocation)
		} catch (error) {
			console.error(error)
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
			console.error(error)
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
			const [weather, forecast] = await Promise.all([
				weatherApi.getCurrWeather(locationData.id, isMetric),
				weatherApi.getForecasts(locationData.id, isMetric),
			])

			return {
				name: locationData.name,
				id: locationData.id,
				weather,
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
		console.error(error)
	}
})

export const updateFavorite = createAsyncThunk(
	'location/updateFavorite',
	async (favorite, { rejectWithValue }) => {
		try {
			return await favoriteService.update(favorite)
		} catch (error) {
			console.error(error)
			return rejectWithValue('could not update favorite')
		}
	}
)

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
			.addCase(updateFavorite.fulfilled, (state, action) => {
				state.favorites = state.favorites.map(favorite =>
					favorite.id === action.payload.id ? action.payload : favorite
				)
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

export const favoritesIdSelector = createSelector(
	state => state.location.favorites,
	favorites => favorites.map(fav => ({ id: fav.id }))
)

export const getFavoritesSelector = createSelector(
	state => state.location.favorites,
	state => state.userPref.tempUnit,
	(favorites, tempUnit) => {
		return favorites.map(fav => ({
			...fav,
			weather: {
				...fav.weather,
				maxTemp: utils.getTempInCorrectUnit(tempUnit, fav.weather.maxTemp),
			},
		}))
	}
)

export const getCurrWeatherSelector = createSelector(
	state => state.location.currLocation,
	state => state.userPref.tempUnit,
	(currLocation, tempUnit) => {
		if (!currLocation.weather) return {}

		return {
			...currLocation,
			weather: {
				...currLocation.weather,
				maxTemp: utils.getTempInCorrectUnit(tempUnit, currLocation.weather.maxTemp),
			},
			forecast: currLocation.forecast.map(f => ({
				...f,
				maxTemp: utils.getTempInCorrectUnit(tempUnit, f.maxTemp),
				minTemp: utils.getTempInCorrectUnit(tempUnit, f.minTemp),
			})),
		}
	}
)
