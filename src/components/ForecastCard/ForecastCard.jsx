import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import './ForecastCard.scss'

export default function ForecastCard({ forecast, setLocation }) {
	const isLocationCard = !!forecast.weather

	const { minTemp, maxTemp, date, weatherIcon, weatherText } = isLocationCard
		? forecast.weather
		: forecast
	const imgSrc = `${process.env.REACT_APP_API_WEATHER_ICON}${weatherIcon}-s.png`

	function onChooseCard() {
		if (!isLocationCard) return
		setLocation(forecast.name, forecast.id)
	}

	const title = isLocationCard
		? forecast.name
		: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))

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
						<Typography className='min-temp' data-temp-unit={minTemp.unit}>
							{minTemp.value}
						</Typography>
					)}
					<Typography className='max-temp' data-temp-unit={maxTemp.unit}>
						{maxTemp.value}
					</Typography>
				</div>
			</CardContent>
		</Card>
	)
}
