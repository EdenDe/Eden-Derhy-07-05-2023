import React from 'react'
import ForecastCard from './ForecastCard'

export default function ForecastList({ forecastList }) {
	return (
		<section className='forecast-list'>
			{forecastList.map(forecast => (
				<ForecastCard key={forecast.Date} forecast={forecast} />
			))}
		</section>
	)
}
