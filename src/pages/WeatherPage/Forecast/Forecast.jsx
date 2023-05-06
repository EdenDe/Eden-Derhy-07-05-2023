import React, { Suspense, useEffect, useMemo, useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import './Forecast.scss'
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg'
import SkeletonList from '../../../components/ForecastList/SkeletonList'
import ForecastList from '../../../components/ForecastList/ForecastList'
import { Button, IconButton, Typography } from '@mui/material'
import { utils } from '../../../helpers/utils'

export default function Forecast({ toggleFavorite, loadLastLocation }) {
	const favorites = useSelector(state => state.location.favorites)
	const currLocation = useSelector(state => state.location.currLocation)
	const status = useSelector(state => state.location.status)
	const prefUnit = useSelector(state => state.userPref.tempUnit)
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

	function TempInCorrectUnit({ currUnit, temp }) {
		return utils.getTempInCorrectUnit(prefUnit, currUnit, temp)
	}

	return (
		<section className='forecast '>
			<div className='flex curr-weather-details'>
				<div className='grid'>
					<span className='location-name'>{currLocation.name}</span>
					<span data-temp-unit={prefUnit}>
						<TempInCorrectUnit
							currUnit={currLocation.currWeather.maxTemp.Unit}
							temp={currLocation.currWeather.maxTemp.Value}
						/>
					</span>
				</div>
				<Button className='btn-favorite flex align-center' onClick={() => toggleFavorite(isFav)}>
					<FavoriteIcon className={`icon icon-heart  ${isFav ? 'favorite' : ''} `} />
					<span>{isFav ? 'Remove' : 'Add'} from favorites </span>
				</Button>
			</div>

			<h3 className='weather-txt'>{currLocation.currWeather.weatherText}</h3>
			<ForecastList forecastList={currLocation.forecast} />
		</section>
	)
}
