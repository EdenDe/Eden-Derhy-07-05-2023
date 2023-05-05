import React, { Suspense, useEffect, useMemo, useState } from 'react'
import ForecastList from '../ForecastList/ForecastList'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import './Forecast.scss'
import { CircularProgress } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import SkeletonList from '../ForecastList/SkeletonList'

export default function Forecast({ toggleFavorite, loadLastLocation }) {
	const favorites = useSelector(state => state.location.favorites)
	const currLocation = useSelector(state => state.location.currLocation)
	const status = useSelector(state => state.location.status)

	// useEffect(() => {
	// 	async function getCurrLocationDetails() {
	// 		try {
	// 			const [currWeather, forecast] = await Promise.all([
	// 				apiWeather.getCurrWeather(locationData.id),
	// 				apiWeather.getForecasts(locationData.id),
	// 			])
	// 			setIsLoading(false)
	// 		} catch (error) {

	// 		}
	// 	}
	// 	getCurrLocationDetails()
	// }, [currLocation])

	const isFav = useMemo(
		() => favorites.some(fav => fav.id === currLocation.id),
		[favorites, currLocation.id]
	)

	if (status === 'loading') {
		return <SkeletonList length={5} />
	}

	if (status === 'failed') {
		return <ErrorMsg resetErrorBoundary={loadLastLocation} />
	}

	return (
		<section className='forecast'>
			<div className='flex'>
				<div className='grid'>
					<span>{currLocation.name}</span>
					<span data-temp-unit={currLocation.currWeather.maxTemp.Unit}>
						{currLocation.currWeather.maxTemp.Value}
					</span>
				</div>
				<div className='action-btns flex align-center'>
					<FavoriteIcon
						onClick={() => toggleFavorite(isFav)}
						className={`icon icon-heart  ${isFav ? 'favorite' : ''} `}
					/>
					<button> change to F </button>
				</div>
			</div>

			<h3 className='weather-txt'>{currLocation.currWeather.weatherText}</h3>
			<ForecastList forecastList={currLocation.forecast} />
		</section>
	)
}
