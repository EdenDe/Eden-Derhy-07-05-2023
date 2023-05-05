import ForecastCard from '../ForecastCard/ForecastCard'
import './ForecastList.scss'

export default function ForecastList({ forecastList, setLocation }) {
	return (
		<section className='forecast-list'>
			{forecastList.map(forecast => (
				<ForecastCard key={forecast.id} forecast={forecast} setLocation={setLocation} />
			))}
		</section>
	)
}
