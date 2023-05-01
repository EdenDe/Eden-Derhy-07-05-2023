import React from 'react'
import { useSelector } from 'react-redux'
import ForecastList from '../components/ForecastList'

export default function FavoritesPage() {
	const favorites = useSelector(state => state.favorite.favorites)

	return <section>{<ForecastList forecastList={favorites} />}</section>
}
