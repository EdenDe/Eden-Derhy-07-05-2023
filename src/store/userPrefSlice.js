import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoriteService } from '../helpers/favoriteService'
import { toast } from 'react-toastify'
import { weatherApi } from '../helpers/weatherApi'

const userPrefSlice = createSlice({
	name: 'locationSlice',
	initialState: {
		degreesUnit: 'C',
		theme: 'light',
	},
	reducers: {
		setDegreeUnit(state, action) {
			state.degreesUnit = action.payload
		},
		setTheme(state, action) {
			state.theme = action.payload
		},
	},
})

export default userPrefSlice.reducer
export const { loadLocation } = userPrefSlice.actions
