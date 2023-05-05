import SkeletonCard from '../ForecastCard/SkeletonCard'
import './ForecastList.scss'

export default function ForecastList({ length }) {
	return (
		<section className='forecast-list'>
			{[...Array(length).keys()].map(i => (
				<SkeletonCard key={i} />
			))}
		</section>
	)
}
