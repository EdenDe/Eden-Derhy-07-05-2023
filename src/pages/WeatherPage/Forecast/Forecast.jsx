import { useMemo } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import ErrorMsg from '../../../components/ErrorMsg/ErrorMsg'
import SkeletonList from '../../../components/ForecastList/SkeletonList'
import ForecastList from '../../../components/ForecastList/ForecastList'
import { IconButton } from '@mui/material'
import { utils } from '../../../helpers/utils'
import './Forecast.scss'

export default function Forecast({ toggleFavorite, loadLastLocation }) {
	const favorites = useSelector(state => state.location.favorites)
	const currLocation = useSelector(state => state.location.currLocation)
	const status = useSelector(state => state.location.status)
	const prefUnit = useSelector(state => state.userPref.tempUnit)
	//const status = 'loading'

	const isFav = useMemo(
		() => favorites.some(fav => fav.id === currLocation.id),
		[favorites, currLocation.id]
	)

	if (status === 'loading') {
		return <SkeletonList length={5} />
	}

	if (status === 'failed') {
		return (
			<ErrorMsg
				error={currLocation.id ? 'connection to server lost' : null}
				callback={loadLastLocation}
			/>
		)
	}

	function TempInCorrectUnit({ currUnit, temp }) {
		return utils.getTempInCorrectUnit(prefUnit, currUnit, temp)
	}

	return (
		<section className='forecast '>
			<div className='curr-weather-details'>
				<h1 className='location-name'>{currLocation.name}</h1>
				<span className='location-date'>
					{Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
						new Date(currLocation.currWeather.date)
					)}
				</span>
				<span className='location-temp' data-temp-unit={prefUnit}>
					<TempInCorrectUnit
						currUnit={currLocation.currWeather.maxTemp.Unit}
						temp={currLocation.currWeather.maxTemp.Value}
					/>
				</span>
				<IconButton
					className='btn-favorite flex align-center'
					onClick={() => toggleFavorite(isFav)}
				>
					<FavoriteIcon className={`icon icon-heart  ${isFav ? 'favorite' : ''} `} />
				</IconButton>
				<img
					alt={currLocation.currWeather.weatherText}
					className='weather-img'
					src={`${process.env.REACT_APP_API_WEATHER_ICON}${currLocation.currWeather.weatherIcon}-s.png`}
				/>
				<span className='weather-txt'>{currLocation.currWeather.weatherText}</span>
			</div>

			<ForecastList forecastList={currLocation.forecast} />
		</section>
	)
}
