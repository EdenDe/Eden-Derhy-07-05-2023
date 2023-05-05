import React, { Suspense, useEffect, useState } from 'react'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Forecast from '../../components/Forecast/Forecast'
import { useDispatch } from 'react-redux'
import {
	saveToFavs,
	removeFromFavs,
	setCurrLocation,
	loadLocation,
} from '../../store/locationSlice'
import './WeatherPage.scss'
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg'
import { CircularProgress } from '@mui/material'
import { apiWeather } from '../../helpers/apiWeatherCalls'

export const WeatherPage = () => {
	const dispatch = useDispatch()

	function setLocation(name, id) {
		dispatch(setCurrLocation({ name, id }))
	}

	function toggleFavorite(isFav) {
		dispatch(isFav ? removeFromFavs() : saveToFavs())
	}

	function loadLastLocation(lastLocation) {
		dispatch(loadLocation(lastLocation))
	}

	return (
		<section>
			<SearchFilter setLocation={setLocation} />
			<Forecast loadLastLocation={loadLastLocation} toggleFavorite={toggleFavorite} />
		</section>
	)
}

export default WeatherPage
