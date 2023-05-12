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
		setPrefTempUnit(state, action) {
			userPrefService.setCookie(TEMP_UNIT_KEY, action.payload)
			state.tempUnit = action.payload
		},
		setPrefMode(state, action) {
			userPrefService.setCookie(MODE_KEY, action.payload)
			state.mode = action.payload
		},
	},
})

export default userPrefSlice.reducer
export const { setPrefMode, setPrefTempUnit } = userPrefSlice.actions
