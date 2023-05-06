import React, { useState } from 'react'
import { TextField, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import { weatherApi } from '../../../helpers/weatherApi'
import { utils } from '../../../helpers/utils'
import './SearchFilter.scss'

export default function SearchFilter({ setLocation }) {
	const [cityOptions, setCityOptions] = useState([])
	const [error, setError] = useState(null)

	async function getOptions(searchInput) {
		try {
			const options = await weatherApi.getCities(searchInput)
			setCityOptions(options)
		} catch (error) {
			setError('sorry, an error occurred, please try again later')
		}
	}

	function onSearch(ev) {
		const { value = '' } = ev.target

		if (utils.regexCheckEngLettersOnly(value)) {
			setError('invalid input')
			return
		}

		setError(null)
		if (value === '') return

		const setDebounceInput = utils.debounce(() => getOptions(value), 1000)
		setDebounceInput()
	}

	function onSelectCity(value) {
		if (cityOptions && cityOptions[value]) {
			setLocation(value, cityOptions[value].id)
		}
	}

	return (
		<section className='search-filter'>
			<FormControl variant='standard' className='form-control'>
				<Autocomplete
					loading={!!cityOptions.length}
					className='autocomplete'
					disabled={error && error !== 'invalid input'}
					options={Object.keys(cityOptions)}
					renderOption={(props, option) => (
						<option {...props} value={option}>
							{option}
						</option>
					)}
					onChange={(event, option) => onSelectCity(option)}
					renderInput={params => (
						<TextField
							error={!!error}
							onChange={onSearch}
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
