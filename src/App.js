import { useContext, useMemo } from 'react'
import './assets/scss/global.scss'

import AppHeader from './components/AppHeader/AppHeader'
import FavoritesPage from './pages/FavoritesPage/FavoritePage'
import WeatherPage from './pages/WeatherPage/WeatherPage'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider, createTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getDesignTokens } from './theme/customTheme'
import { toggleMode, toggleTempUnit } from './store/userPrefSlice'

function App() {
	const dispatch = useDispatch()
	const mode = useSelector(state => state.userPref.mode)
	const tempUnit = useSelector(state => state.userPref.tempUnit)

	const theme = useMemo(() => {
		return createTheme(getDesignTokens(mode))
	}, [mode])

	function setMode() {
		dispatch(toggleMode())
	}

	function setTempUnit() {
		dispatch(toggleTempUnit())
	}

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<section className={`main-layout ${mode}-mode`}>
					<AppHeader setMode={setMode} mode={mode} tempUnit={tempUnit} setTempUnit={setTempUnit} />
					<main className='main-container-layout'>
						<Routes>
							<Route path='/favorite' element={<FavoritesPage />} />
							<Route path='/:locationKey?' element={<WeatherPage />} />
						</Routes>
					</main>
					<ToastContainer />
				</section>
			</Router>
		</ThemeProvider>
	)
}

export default App
