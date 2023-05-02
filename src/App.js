import './assets/scss/global.scss'

import AppHeader from './components/AppHeader/AppHeader'
import FavoritesPage from './views/FavoritesPage/FavoritePage'
import WeatherPage from './views/WeatherPage/WeatherPage'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'

function App() {
	return (
		<Router>
			<section className='main-layout'>
				<AppHeader />
				<main className='main-container-layout'>
					<Routes>
						<Route path='/favorite' element={<FavoritesPage />} />
						<Route path='/' element={<WeatherPage />} />
					</Routes>
				</main>
			</section>
		</Router>
	)
}

export default App
