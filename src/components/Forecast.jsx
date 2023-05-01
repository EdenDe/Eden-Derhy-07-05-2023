import React, { useEffect, useMemo, useState } from 'react'
import ForecastList from './ForecastList'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { useGetCurrWeatherQuery, useGetForcastsQuery } from '../store/apiSlice'

export default function Forecast({ toggleFavorite }) {
	const currLocation = useSelector(state => state.location.currLocation)
	console.log(currLocation)
	const { data: forecastData, error, isLoading } = useGetForcastsQuery(currLocation.id)
	const {
		data: currWeatherData,
		error: currWeatherError,
		isLoading: currWeatherLoading,
	} = useGetCurrWeatherQuery(currLocation.id)

	//console.log('forecastData', forecastData)
	//console.log('currWeatherData', currWeatherData)

	const favorites = useSelector(state => state.location.favorites)

	//const [isFav, setIsFav] = useState(false)
	const isFav = useMemo(() => favorites.some(fav => fav.id === currLocation.id), [favorites, currLocation.id])

	// useEffect(() => {

	// 	setIsFav(favorites.some(fav => fav.id === currLocation.id))
	// }, [favorites, currLocation.id])

	if (currWeatherError || error) {
		console.log(currWeatherError)
		console.log(error)
		return <div> sorry</div>
	}
	if (isLoading || currWeatherLoading) {
		console.log(currWeatherLoading)
		console.log(isLoading)
		return <div>loading..</div>
	}
	return (
		<section className='forecast'>
			<div className='grid'>
				<span>{currLocation.name}</span>
				<span>{currWeatherData.weatherText}</span>
				<span data-temp-unit={currWeatherData.maxTemp.Unit}>{currWeatherData.maxTemp.Value}</span>
			</div>

			<FavoriteIcon
				onClick={() => toggleFavorite(currWeatherData, isFav)}
				className={`icon icon-heart  ${isFav ? 'favorite' : ''} `}
			/>

			<ForecastList forecastList={forecastData} />
		</section>
	)
}
