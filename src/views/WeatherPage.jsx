import React from 'react'
import SearchFilter from '../components/SearchFilter'
import Forecast from '../components/Forecast'
import { useDispatch } from 'react-redux'
import { saveToFavs, removeFromFavs, setCurrLocation } from '../store/weatherSlice'

export const WeatherPage = () => {
	const dispatch = useDispatch()
	console.log('weather')

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
