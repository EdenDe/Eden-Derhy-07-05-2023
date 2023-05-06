import SearchFilter from '../WeatherPage/SearchFilter/SearchFilter'
import Forecast from '../WeatherPage/Forecast/Forecast'
import { useDispatch } from 'react-redux'
import {
	saveToFavs,
	removeFromFavs,
	setCurrLocation,
	loadLocation,
} from '../../store/locationSlice'

export default function WeatherPage() {
	const dispatch = useDispatch()

	function setLocation(name, id) {
		dispatch(setCurrLocation({ name, id }))
	}

	function toggleFavorite(isFav) {
		dispatch(isFav ? removeFromFavs() : saveToFavs())
	}

	function loadLastLocation(lastLocation) {
		dispatch(loadLocation(lastLocation))
	}

	return (
		<section>
			<SearchFilter setLocation={setLocation} />
			<Forecast loadLastLocation={loadLastLocation} toggleFavorite={toggleFavorite} />
		</section>
	)
}
