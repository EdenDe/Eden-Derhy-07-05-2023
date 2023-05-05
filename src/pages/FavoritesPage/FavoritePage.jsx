import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ForecastList from '../../components/ForecastList/ForecastList'
import { setCurrLocation } from '../../store/locationSlice'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as EmptySvg } from '../../assets/svg/empty.svg'
import './FavoritePage.scss'

export default function FavoritesPage() {
	const favorites = useSelector(state => state.location.favorites)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function setLocation(name, id) {
		dispatch(setCurrLocation({ name, id }))
		navigate('/')
	}

	return (
		<section className='favorite-page'>
			{favorites.length ? (
				<ForecastList forecastList={favorites} setLocation={setLocation} />
			) : (
				<EmptySvg />
			)}
		</section>
	)
}
