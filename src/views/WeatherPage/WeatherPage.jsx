import React from 'react'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Forecast from '../../components/Forecast/Forecast'
import { useDispatch } from 'react-redux'
import { saveToFavs, removeFromFavs, setCurrLocation } from '../../store/locationSlice'
import './WeatherPage.scss'

export const WeatherPage = () => {
	const dispatch = useDispatch()

	function getDetails(name, id) {
		dispatch(setCurrLocation({ name, id }))
	}

	function toggleFavorite(currWeather, isFav) {
		if (isFav) {
			dispatch(removeFromFavs())
			return
		}
		dispatch(saveToFavs(currWeather))
	}

	return (
		<div>
			<SearchFilter getDetails={getDetails} />
			<Forecast toggleFavorite={toggleFavorite} />
		</div>
	)
}

export default WeatherPage
