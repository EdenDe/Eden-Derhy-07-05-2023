import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import ThemeContextWrapper from './theme/ThemeContextWrapper'
import { setFavorites } from './store/locationSlice'

store.dispatch(setFavorites())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ThemeContextWrapper>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeContextWrapper>
	</React.StrictMode>
)
