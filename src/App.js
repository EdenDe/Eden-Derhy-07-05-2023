import { useContext } from 'react'
import './assets/scss/global.scss'

import AppHeader from './components/AppHeader/AppHeader'
import FavoritesPage from './pages/FavoritesPage/FavoritePage'
import WeatherPage from './pages/WeatherPage/WeatherPage'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeContext } from './theme/themeContext'

function App() {
	const { theme } = useContext(ThemeContext)

	return (
		<Router>
			<section className={`main-layout ${theme.palette.mode}-mode`}>
				<AppHeader />
				<main className='main-container-layout'>
					<Routes>
						<Route path='/favorite' element={<FavoritesPage />} />
						<Route path='/:locationKey?' element={<WeatherPage />} />
					</Routes>
					<div className='screen'></div>
				</main>
				<ToastContainer />
			</section>
		</Router>
	)
}

export default App
