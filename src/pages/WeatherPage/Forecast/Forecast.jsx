import { useMemo } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg'
import ForecastList from '../../../components/ForecastList/ForecastList'
import { CircularProgress, IconButton } from '@mui/material'
import { favoritesIdSelector, getCurrWeatherSelector } from '../../../store/locationSlice'
import './Forecast.scss'

export default function Forecast({ toggleFavorite, loadLastLocation }) {
	const favorites = useSelector(favoritesIdSelector)
	const location = useSelector(getCurrWeatherSelector)
	const status = useSelector(state => state.location.status)

	const isFav = useMemo(
		() => favorites.some(fav => fav.id === location.id),
		[favorites, location.id]
	)

	if (status === 'loading') {
		return (
			<div className='loader-wrapper'>
				<CircularProgress className='loader' size={64} />
			</div>
		)
	}

	if (status === 'failed') {
		return (
			<ErrorMsg
				error={location.id ? 'connection to server lost' : null}
				callback={loadLastLocation}
			/>
		)
	}

	return (
		<section className='forecast '>
			<div className='curr-weather-details'>
				<h1 className='location-name'>{location.name}</h1>
				<span className='location-date'>
					{Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(new Date(location.weather.date))}
				</span>
				<span className='location-temp' data-temp-unit={location.weather.maxTemp.unit}>
					{location.weather.maxTemp.value}
				</span>
				<IconButton
					className='btn-favorite flex align-center'
					onClick={() => toggleFavorite(isFav)}
				>
					<FavoriteIcon className={`icon icon-heart  ${isFav ? 'favorite' : ''} `} />
				</IconButton>
				<img
					alt={location.weather.weatherText}
					className='weather-img'
					src={`${process.env.REACT_APP_API_WEATHER_ICON}${location.weather.weatherIcon}-s.png`}
				/>
				<span className='weather-txt'>{location.weather.weatherText}</span>
			</div>

			<ForecastList forecastList={location.forecast} />
		</section>
	)
}
