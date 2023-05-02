import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import './ForecastCard.scss'

export default function ForecastCard({ forecast, setLocation }) {
	const isLocationCard = !!forecast.currWeather

	const weatherDetails = isLocationCard ? forecast.currWeather : forecast
	const { minTemp, maxTemp, date, weatherIcon } = weatherDetails
	const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))
	const imgSrc = `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`

	function onChooseCard() {
		if (!isLocationCard) return
		setLocation(forecast.name, forecast.id)
	}

	return (
		<Card className={`forecast-card grid ${isLocationCard ? 'location-card' : ''}`} onClick={onChooseCard}>
			<Typography variant='h5'>{isLocationCard ? forecast.name : dayName}</Typography>
			<div className='img-wrapper'>
				<CardMedia alt={weatherIcon} image={imgSrc} component='img' />
			</div>
			<CardContent className='temp-details flex justify-center'>
				{minTemp && (
					<Typography className='min-temp' data-temp-unit={minTemp.Unit}>
						{minTemp.Value}
					</Typography>
				)}
				<Typography className='max-temp' data-temp-unit={maxTemp.Unit}>
					{maxTemp.Value}
				</Typography>
			</CardContent>
		</Card>
	)
}
