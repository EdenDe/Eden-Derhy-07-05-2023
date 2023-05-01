import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function ForecastCard({ forecast }) {
	const forecastt = forecast.currWeather ? forecast.currWeather : forecast
	const { minTemp, maxTemp, date, weatherIcon } = forecastt
	const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))
	const imgSrc = `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`

	return (
		<Card className='forecast-card grid'>
			<Typography variant='h5'>{dayName}</Typography>
			<div className='img-wrapper'>
				<CardMedia alt={weatherIcon} image={imgSrc} component='img' />
			</div>
			<CardContent className='temp-details flex justify-between'>
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
