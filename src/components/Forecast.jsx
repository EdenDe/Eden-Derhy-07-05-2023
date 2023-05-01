import React, { useEffect, useState } from 'react'
import ForecastList from './ForecastList'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { useGetCurrWeatherQuery, useGetForcastsQuery } from '../store/apiSlice'

export default function Forecast({ selectedCity, forecastList, toggleFavorite }) {
	const { data: forecastData, error, isError, isLoading } = useGetForcastsQuery(selectedCity.id)
	const {
		data: currWeatherData,
		error: currWeatherError,
		isError: currWeatherIsError,
		isLoading: currWeatherLoading,
	} = useGetCurrWeatherQuery(selectedCity.id)

	console.log('forecastData', forecastData)
	console.log('currWeatherData', currWeatherData)

	const favorites = useSelector(state => state.favorite.favorites)
	const [isFav, setIsFav] = useState(false)

	useEffect(() => {
		setIsFav(favorites.some(fav => fav.id === selectedCity.id))
	}, [favorites])

	if (isLoading || currWeatherLoading) {
		return <div>loading..</div>
	}
	return (
		<section className='forecast'>
			<div className='grid'>
				<span>{selectedCity.name}</span>
				<span>{currWeatherData.weatherText}</span>
				<span data-temp-unit={currWeatherData.maxTemp.Unit}>{currWeatherData.maxTemp.Value}</span>
			</div>

			<FavoriteIcon
				onClick={() => toggleFavorite(currWeatherData)}
				className={`icon icon-heart  ${isFav ? 'favorite' : ''} `}
			/>

			<ForecastList forecastList={forecastData} />
		</section>
	)
}
