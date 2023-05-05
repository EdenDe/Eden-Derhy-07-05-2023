import React, { useEffect, useState } from 'react'
import { TextField, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import { utils } from '../../helpers/utils'
import './SearchFilter.scss'
import { apiWeather } from '../../helpers/apiWeatherCalls'
import { useSelector } from 'react-redux'

export default function SearchFilter({ setLocation }) {
	const currLocation = useSelector(state => state.location.currLocation.name)

	const [options, setOptions] = useState([])
	const [error, setError] = useState(null)

	async function getOptions(searchInput) {
		try {
			const options = await apiWeather.getCities(searchInput)
			setOptions(options)
		} catch (error) {
			setError('sorry, an error occurred, please try again later')
		}
	}

	function changeHandler(ev) {
		const { value = '' } = ev.target

		if (value === currLocation.name) return
		if (utils.regexCheckEngLettersOnly(value)) {
			setError('invalid input')
			return
		}

		const setDebounceInput = utils.debounce(() => getOptions(value), 1000)
		setDebounceInput()
		setError(null)

		if (options && options[value]) {
			setLocation(value, options[value].id)
		}
	}

	return (
		<section className='search-filter'>
			<FormControl variant='standard' className='form-control'>
				<Autocomplete
					className='autocomplete'
					disabled={!!error}
					options={Object.keys(options)}
					renderOption={(props, option) => (
						<option {...props} value={option}>
							{option}
						</option>
					)}
					onSelect={changeHandler}
					renderInput={params => (
						<TextField
							error={!!error}
							onChange={changeHandler}
							{...params}
							label='Select a city'
							variant='outlined'
						/>
					)}
				/>

				{error && (
					<FormHelperText error id='component-error-text'>
						{error}
					</FormHelperText>
				)}
			</FormControl>
		</section>
	)
}
