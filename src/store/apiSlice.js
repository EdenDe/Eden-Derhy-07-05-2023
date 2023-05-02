import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { utils } from '../helpers/utils'

const API_KEY = process.env.REACT_APP_API_KEY_WEATHER

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://dataservice.accuweather.com/',
	}),
	endpoints: builder => ({
		getForecasts: builder.query({
			query: locationKey =>
				`forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=true`,
			transformResponse: ({ DailyForecasts }) =>
				DailyForecasts.map(({ Date, Day, Temperature }) => {
					return createWeather(Date, Day.Icon, Day.IconPhrase, Temperature.Maximum, Temperature.Minimum)
				}),
		}),
		getCities: builder.query({
			query: locationName => `locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${locationName}&language=en-us`,
			transformResponse: result => {
				return result?.reduce((newObj, location) => {
					newObj[location.LocalizedName] = { id: location.Key }
					return newObj
				}, {})
			},
		}),
		getCurrWeather: builder.query({
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
		id: utils.makeId(7),
		date,
		weatherIcon: (weatherIcon + '').padStart(2, 0),
		weatherText,
		maxTemp,
		minTemp,
	}
}

export const { useGetForecastsQuery, useGetCitiesQuery, useGetCurrWeatherQuery } = weatherApi
