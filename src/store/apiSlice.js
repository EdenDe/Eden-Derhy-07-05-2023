import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { utilService } from '../services/util.service'

const API_KEY = 'UkFAdiealAGJsXthHaOqoInK2YH9Z7a3'
//const API_KEY = 'Xi15Hl1FoGfb3jAp4TFN6COb9EMmUJQ8'
export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://dataservice.accuweather.com/',
	}),

	endpoints: builder => ({
		keepUnusedDataFor: 50000,
		getForcasts: builder.query({
			query: locationKey =>
				`forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=true`,
			transformResponse: ({ DailyForecasts }) =>
				DailyForecasts.map(({ Date, Day, Temperature }) => {
					return createWeather(Date, Day.Icon, Day.IconPhrase, Temperature.Maximum, Temperature.Minimum)
				}),
		}),
		getCities: builder.query({
			keepUnusedDataFor: 20,
			query: locationName => `locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${locationName}&language=en-us`,
			transformResponse: result => {
				return result.reduce((newObj, location) => {
					newObj[location.LocalizedName] = { id: location.Key }
					return newObj
				}, {})
			},
		}),
		getCurrWeather: builder.query({
			keepUnusedDataFor: 5000,
			query: locationKey =>
				`currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en-us&details=false HTTP/1.1`,
			transformResponse: result => {
				const { LocalObservationDateTime, WeatherIcon, WeatherText, Temperature } = result[0]
				return createWeather(LocalObservationDateTime, WeatherIcon, WeatherText, Temperature['Metric'])
			},
		}),
	}),
})

function createWeather(date, weatherIcon, weatherText, maxTemp, minTemp) {
	return {
		id: utilService.makeId(7),
		date,
		weatherIcon: (weatherIcon + '').padStart(2, 0),
		weatherText,
		maxTemp,
		minTemp,
	}
}

export const { useGetForcastsQuery, useGetCitiesQuery, useGetCurrWeatherQuery } = weatherApi
