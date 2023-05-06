import React, { Suspense, useEffect, useMemo, useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import './Forecast.scss'
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg'
import SkeletonList from '../../../components/ForecastList/SkeletonList'
import ForecastList from '../../../components/ForecastList/ForecastList'

export default function Forecast({ toggleFavorite, loadLastLocation }) {
	const favorites = useSelector(state => state.location.favorites)
	const currLocation = useSelector(state => state.location.currLocation)
	const status = useSelector(state => state.location.status)
	//const status = 'loading'

	const isFav = useMemo(
		() => favorites.some(fav => fav.id === currLocation.id),
		[favorites, currLocation.id]
	)

	if (status === 'loading') {
		return <SkeletonList length={5} />
	}

	if (status === 'failed') {
		return (
			<ErrorMsg
				error={currLocation.id ? 'connection to server lost' : null}
				callback={loadLastLocation}
			/>
		)
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
