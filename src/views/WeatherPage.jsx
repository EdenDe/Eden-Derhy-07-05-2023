import React, { useEffect, useState } from 'react'
import SearchFilter from '../components/SearchFilter'
import Forecast from '../components/Forecast'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation, removeLocation } from '../store/favoriteSlice'
import { useGetForcastsQuery } from '../store/apiSlice'

export const WeatherPage = () => {
	const [options, setOptions] = useState([])
	const [selectedCity, setSelectedCity] = useState({ name: 'Netanya', id: '212474' })
	const locationData = [
		{
			Version: 1,
			Key: '212474',
			Type: 'City',
			Rank: 45,
			LocalizedName: 'Netanya',
			Country: {
				ID: 'IL',
				LocalizedName: 'Israel',
			},
			AdministrativeArea: {
				ID: 'M',
				LocalizedName: 'Central District',
			},
		},
		{
			Version: 1,
			Key: '174510',
			Type: 'City',
			Rank: 53,
			LocalizedName: 'Nettetal',
			Country: {
				ID: 'DE',
				LocalizedName: 'Germany',
			},
			AdministrativeArea: {
				ID: 'NW',
				LocalizedName: 'North Rhine-Westphalia',
			},
		},
		{
			Version: 1,
			Key: '27886',
			Type: 'City',
			Rank: 55,
			LocalizedName: 'Netrokona',
			Country: {
				ID: 'BD',
				LocalizedName: 'Bangladesh',
			},
			AdministrativeArea: {
				ID: 'C',
				LocalizedName: 'Dhaka',
			},
		},
		{
			Version: 1,
			Key: '213397',
			Type: 'City',
			Rank: 55,
			LocalizedName: 'Nettuno',
			Country: {
				ID: 'IT',
				LocalizedName: 'Italy',
			},
			AdministrativeArea: {
				ID: '62',
				LocalizedName: 'Lazio',
			},
		},
		{
			Version: 1,
			Key: '324060',
			Type: 'City',
			Rank: 55,
			LocalizedName: 'Netishyn',
			Country: {
				ID: 'UA',
				LocalizedName: 'Ukraine',
			},
			AdministrativeArea: {
				ID: '68',
				LocalizedName: "Khmel'nyts'kyy",
			},
		},
		{
			Version: 1,
			Key: '170459',
			Type: 'City',
			Rank: 63,
			LocalizedName: 'Netphen',
			Country: {
				ID: 'DE',
				LocalizedName: 'Germany',
			},
			AdministrativeArea: {
				ID: 'NW',
				LocalizedName: 'North Rhine-Westphalia',
			},
		},
		{
			Version: 1,
			Key: '3588326',
			Type: 'City',
			Rank: 65,
			LocalizedName: 'Netaji Nagar',
			Country: {
				ID: 'IN',
				LocalizedName: 'India',
			},
			AdministrativeArea: {
				ID: 'DL',
				LocalizedName: 'Delhi',
			},
		},
		{
			Version: 1,
			Key: '197763',
			Type: 'City',
			Rank: 65,
			LocalizedName: 'Netrang',
			Country: {
				ID: 'IN',
				LocalizedName: 'India',
			},
			AdministrativeArea: {
				ID: 'GJ',
				LocalizedName: 'Gujarat',
			},
		},
		{
			Version: 1,
			Key: '244499',
			Type: 'City',
			Rank: 65,
			LocalizedName: 'Netia',
			Country: {
				ID: 'MZ',
				LocalizedName: 'Mozambique',
			},
			AdministrativeArea: {
				ID: 'N',
				LocalizedName: 'Nampula',
			},
		},
		{
			Version: 1,
			Key: '174587',
			Type: 'City',
			Rank: 73,
			LocalizedName: 'Nettersheim',
			Country: {
				ID: 'DE',
				LocalizedName: 'Germany',
			},
			AdministrativeArea: {
				ID: 'NW',
				LocalizedName: 'North Rhine-Westphalia',
			},
		},
	]

	const dispatch = useDispatch()
	const favorites = useSelector(state => state.favorite.favorites)
	const [dailyForecasts, setDailyForecasts] = useState()

	// useEffect(() => {
	// 	if (selectedCity.id) {
	// 		getForecasts()
	// 	}
	// }, [selectedCity])

	// const getForecasts = () => {
	// 	setDailyForecasts(data)
	// }

	function findLocation(cityName) {
		///use API;

		console.log(cityName)
		const LocOptions = locationData.reduce((newObj, location) => {
			newObj[location.LocalizedName] = { id: location.Key }
			return newObj
		}, {})
		setOptions(LocOptions)
	}

	function getDetails(key) {
		if (selectedCity?.id === key) return

		setSelectedCity({ name: 'Netanya', id: '212474' })
	}

	function toggleFavorite(currWeather) {
		if (favorites.some(fav => fav.id === selectedCity.id)) {
			dispatch(removeLocation(selectedCity.id))
			return
		}
		const location = { ...selectedCity, currWeather }
		setSelectedCity(location)
		dispatch(addLocation(location))
	}

	return (
		<div>
			<SearchFilter options={options} getDetails={getDetails} findLocation={findLocation} />
			<Forecast selectedCity={selectedCity} toggleFavorite={toggleFavorite} />
		</div>
	)
}

export default WeatherPage
