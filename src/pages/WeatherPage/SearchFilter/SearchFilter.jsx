import { useEffect, useState } from 'react'
import { TextField, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import { weatherApi } from '../../../helpers/weatherApi'
import { utils } from '../../../helpers/utils'
import './SearchFilter.scss'
import { useSelector } from 'react-redux'

export default function SearchFilter({ setLocation }) {
	const currLocation = useSelector(state => state.location.currLocation)

	const [cityOptions, setCityOptions] = useState([currLocation])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	async function getOptions(searchInput) {
		try {
			const options = await weatherApi.getCities(searchInput)
			setCityOptions(options)
		} catch (error) {
			setError('sorry, an error occurred, please try again later')
		}
	}

	useEffect(() => {
		setIsLoading(false)
	}, [cityOptions])

	function onSearch(ev) {
		const { value = '' } = ev.target

		if (value !== '' && utils.regexCheckEngLettersOnly(value)) {
			setError('invalid input')
			return
		}

		setError(null)
		if (value === '') return

		setIsLoading(true)
		const getDebounceOptions = utils.debounce(() => getOptions(value), 1000)
		getDebounceOptions()
	}

	function onSelectCity(value) {
		if (value?.id && value?.name) {
			setLocation(value.name, value.id)
		}
	}

	return (
		<section className='search-filter'>
			<FormControl variant='standard' className='form-control'>
				<Autocomplete
					loading={isLoading}
					className='autocomplete'
					disabled={error && error !== 'invalid input'}
					getOptionLabel={option => option.name}
					options={cityOptions}
					renderOption={(props, option) => {
						return (
							<option {...props} value={option.name}>
								{option.name}
							</option>
						)
					}}
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
