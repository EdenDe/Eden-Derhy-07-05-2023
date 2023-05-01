import React, { useState } from 'react'
import { TextField, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import { useGetCitiesQuery } from '../store/apiSlice'
import { utilService } from '../services/util.service'

export default function SearchFilter({ getDetails }) {
	const [searchInput, setSeachInput] = useState('tel aviv')
	const [inputError, setInputError] = useState(null)

	const { data: options, isLoading, error } = useGetCitiesQuery(searchInput, [searchInput])

	function changeHandler(ev) {
		const { value = '' } = ev.target

		if (value === searchInput) return
		if (!/^[a-zA-Z]+$/.test(value) && value !== '') {
			setInputError('invalid input')
			return
		}

		const setDebounceInput = utilService.debounce(() => setSeachInput(value), 1000)
		setDebounceInput()
		setInputError(null)

		if (options && options[value]) {
			getDetails(value, options[value].id)
		}
	}

	return (
		<section className='search-filter'>
			<FormControl variant='standard' className='form-control'>
				<Autocomplete
					loading={isLoading}
					options={isLoading || error ? [] : Object.keys(options)}
					renderOption={(props, option) => (
						<option {...props} value={option}>
							{option}
						</option>
					)}
					//value={searchInput}
					onSelect={changeHandler}
					//onChange={changeHandler}
					renderInput={params => (
						<TextField
							error={!!inputError}
							onChange={changeHandler}
							{...params}
							label='Select a city'
							variant='outlined'
						/>
					)}
				/>

				{inputError && (
					<FormHelperText error id='component-error-text'>
						{inputError}
					</FormHelperText>
				)}
			</FormControl>
		</section>
	)
}
