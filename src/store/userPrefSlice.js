import { createSlice } from '@reduxjs/toolkit'
import { userPrefService, MODE_KEY, TEMP_UNIT_KEY } from '../helpers/userPrefService'

const initialState = {
	tempUnit: userPrefService.getCookie(TEMP_UNIT_KEY),
	mode: userPrefService.getCookie(MODE_KEY),
}

const userPrefSlice = createSlice({
	name: 'locationSlice',
	initialState,
	reducers: {
		toggleTempUnit(state, action) {
			const unit = state.tempUnit === 'C' ? 'F' : 'C'
			userPrefService.setCookie(TEMP_UNIT_KEY, unit)
			state.tempUnit = unit
		},
		toggleMode(state, action) {
			const mode = state.mode === 'dark' ? 'light' : 'dark'
			userPrefService.setCookie(MODE_KEY, mode)
			state.mode = mode
		},
	},
})

export default userPrefSlice.reducer
export const { toggleMode, toggleTempUnit } = userPrefSlice.actions
