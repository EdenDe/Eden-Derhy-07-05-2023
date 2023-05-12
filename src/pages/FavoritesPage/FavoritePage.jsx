import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ForecastList from '../../components/ForecastList/ForecastList'
import { getFavoritesSelector, setCurrLocation, updateFavorite } from '../../store/locationSlice'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as EmptySvg } from '../../assets/svg/empty.svg'
import { Typography } from '@mui/material'
import { utils } from '../../helpers/utils'
import './FavoritePage.scss'
import { weatherApi } from '../../helpers/weatherApi'

export default function FavoritesPage() {
	const favorites = useSelector(getFavoritesSelector)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		favorites.forEach(fav => {
			if (utils.isAnHourPassed(fav.weather.date)) {
				getUpdatedWeather(fav)
			}
		})
	}, [])

	async function getUpdatedWeather(fav) {
		const weather = await weatherApi.getCurrWeather(fav.id)
		dispatch(updateFavorite({ ...fav, weather }))
	}

	function setLocation(name, id) {
		dispatch(setCurrLocation({ name, id }))
		navigate('/')
	}

	if (!favorites.length) {
		return (
			<section className='grid'>
				<EmptySvg />
			</section>
		)
	}

	return (
		<section className='favorite-page'>
			<Typography variant='h3'>Your Favorite Places</Typography>
			<ForecastList forecastList={favorites} setLocation={setLocation} />
		</section>
	)
}
