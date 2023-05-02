import React, { useState } from 'react'
import { TextField, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import { useGetCitiesQuery } from '../../store/apiSlice'
import { utils } from '../../helpers/utils'
import './SearchFilter.scss'

export default function SearchFilter({ getDetails }) {
	const [searchInput, setSearchInput] = useState('tel aviv')
	const [inputError, setInputError] = useState(null)

	const { data: options, isLoading, error } = useGetCitiesQuery(searchInput, [searchInput])

	console.log(error)

	function changeHandler(ev) {
		const { value = '' } = ev.target

		if (value === searchInput) return
		if (utils.regexCheckEngLettersOnly(value)) {
			setInputError('invalid input')
			return
		}

		const setDebounceInput = utils.debounce(() => setSearchInput(value), 1000)
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
					className='autocomplete'
					disabled={true}
					loading={isLoading}
					options={isLoading || error ? [] : Object.keys(options)}
					renderOption={(props, option) => (
						<option {...props} value={option}>
							{option}
						</option>
					)}
					onSelect={changeHandler}
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
