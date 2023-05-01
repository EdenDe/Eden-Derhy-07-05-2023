import React from 'react'
import ForecastCard from './ForecastCard'

export default function ForecastList({ forecastList, setLocation }) {
	return (
		<section className='forecast-list'>
			{forecastList.map(forecast => (
				<ForecastCard key={forecast.id} forecast={forecast} setLocation={setLocation} />
			))}
		</section>
	)
}
