import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ForecastList from '../components/ForecastList'
import { setCurrLocation } from '../store/weatherSlice'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
	const favorites = useSelector(state => state.location.favorites)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function setLocation(name, id) {
		dispatch(setCurrLocation({ name, id }))
		navigate('/')
	}

	return (
		<section>
			<ForecastList forecastList={favorites} setLocation={setLocation} />
		</section>
	)
}
