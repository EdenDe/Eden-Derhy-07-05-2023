import React, { useEffect, useMemo } from 'react'
import ForecastList from '../ForecastList/ForecastList'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { useGetCurrWeatherQuery, useGetForecastsQuery } from '../../store/apiSlice'
import './Forecast.scss'

export default function Forecast({ toggleFavorite }) {
	const currLocation = useSelector(state => state.location.currLocation)

	const { data: forecastData, error, isLoading } = useGetForecastsQuery(currLocation.id)
	const {
		data: currWeatherData,
		error: currWeatherError,
		isLoading: currWeatherLoading,
	} = useGetCurrWeatherQuery(currLocation.id)

	const favorites = useSelector(state => state.location.favorites)
	const isFav = useMemo(() => favorites.some(fav => fav.id === currLocation.id), [favorites, currLocation.id])

	// if (currWeatherError || error) {
	// 	//TODO: something nicer
	// 	return <div> sorry</div>
	// }
	if (isLoading || currWeatherLoading) {
		return <div>loading..</div>
	}

	return (
		<section className='forecast'>
			<div className='flex'>
				<div className='grid'>
					<span>tel aviv</span>

					<span data-temp-unit='C'> 15.1 </span>
					{/* <span>{currLocation.name}</span>
						<span>{currWeatherData.weatherText}</span>
						<span data-temp-unit={currWeatherData.maxTemp.Unit}>{currWeatherData.maxTemp.Value}</span> */}
				</div>
				<div className='action-btns flex align-center'>
					<FavoriteIcon
						onClick={() => toggleFavorite('f', isFav)}
						className={`icon icon-heart  ${isFav ? 'favorite' : ''} `}
					/>
					<button> change to F </button>
				</div>
			</div>

			<h3 className='weather-txt'>sunnyyyyy yyyyyy</h3>

			{/* <FavoriteIcon
				onClick={() => toggleFavorite(currWeatherData, isFav)}
				className={`icon icon-heart  ${isFav ? 'favorite' : ''} `}
			/>

			<ForecastList forecastList={forecastData} /> */}
		</section>
	)
}
