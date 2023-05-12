import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { setFavorites, setCurrLocation } from './store/locationSlice'

store.dispatch(setFavorites())
store.dispatch(setCurrLocation({ name: 'tel aviv', id: '215854' }))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

if (window.Cypress) {
	window.store = store
}
