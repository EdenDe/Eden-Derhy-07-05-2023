import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import './ForecastCard.scss'
import { useSelector } from 'react-redux'
import { utils } from '../../helpers/utils'

export default function ForecastCard({ forecast, setLocation }) {
	const prefUnit = useSelector(state => state.userPref.tempUnit)
	const isLocationCard = !!forecast.currWeather

	const { minTemp, maxTemp, date, weatherIcon, weatherText } = isLocationCard
		? forecast.currWeather
		: forecast
	const imgSrc = `${process.env.REACT_APP_API_WEATHER_ICON}${weatherIcon}-s.png`

	function onChooseCard() {
		if (!isLocationCard) return
		setLocation(forecast.name, forecast.id)
	}

	const title = isLocationCard
		? forecast.name
		: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))

	function TempInCorrectUnit({ currUnit, temp }) {
		return utils.getTempInCorrectUnit(prefUnit, currUnit, temp)
	}

	return (
		<Card
			className={`forecast-card grid ${isLocationCard ? 'location-card' : ''}`}
			onClick={onChooseCard}
		>
			<Typography variant='h5'>{title}</Typography>
			<CardMedia className='weather-img' alt={weatherIcon} image={imgSrc} component='img' />
			<Typography variant='subtitle1'>{weatherText}</Typography>

			<CardContent>
				<div className='temp-details flex justify-center'>
					{minTemp && (
						<Typography className='min-temp' data-temp-unit={prefUnit}>
							<TempInCorrectUnit currUnit={minTemp.Unit} temp={minTemp.Value} />
						</Typography>
					)}
					<Typography className='max-temp' data-temp-unit={prefUnit}>
						<TempInCorrectUnit currUnit={maxTemp.Unit} temp={maxTemp.Value} />
					</Typography>
				</div>
			</CardContent>
		</Card>
	)
}
