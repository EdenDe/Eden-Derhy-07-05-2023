import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = 'UkFAdiealAGJsXthHaOqoInK2YH9Z7a3'

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://dataservice.accuweather.com/',
	}),
	endpoints: builder => ({
		getForcasts: builder.query({
			query: locationKey =>
				`forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&language=en-us&details=false&metric=true`,
			transformResponse: ({ DailyForecasts }) =>
				DailyForecasts.map(forcast => {
					return {
						date: forcast.Date,
						weatherIcon: (forcast.Day.Icon + '').padStart(2, 0),
						weatherText: forcast.Day.IconPhrase,
						minTemp: forcast.Temperature.Minimum,
						maxTemp: forcast.Temperature.Maximum,
					}
				}),
		}),
		getLocation: builder.query({
			query: locationName => `locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${locationName}&language=en-us`,
		}),
		getCurrWeather: builder.query({
			query: locationKey =>
				`currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=en-us&details=false HTTP/1.1`,
			transformResponse: result =>
				result.map(forcast => {
					return {
						date: forcast.LocalObservationDateTime,
						weatherIcon: (forcast.WeatherIcon + '').padStart(2, 0),
						weatherText: forcast.WeatherText,
						minTemp: null,
						maxTemp: forcast.Temperature['Metric'],
					}
				})[0],
		}),
	}),
})

export const { useGetForcastsQuery, useGetLocationQuery, useGetCurrWeatherQuery } = weatherApi
