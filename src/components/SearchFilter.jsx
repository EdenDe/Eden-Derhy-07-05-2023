import React, { useEffect, useState } from 'react'
import { Input, TextField, InputAdornment, FormHelperText, FormControl, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { utilService } from '../services/util.service'

export default function SearchFilter({ options, findLocation, getDetails }) {
	//const [searchInput, setSeachInput] = useState({name:'tel aviv',key:'11'})
	const [error, setError] = useState(null)

	function changeHandler(ev) {
		const { value } = ev.target

		//if(searchInput.name === value) return

		// setSeachInput({
		//   name: value,
		//   key: dataset.id? dataset.id : null
		// })

		if (options[value]) {
			getDetails(options[value].key)
			return
		} else {
			const debounceSendRequest = utilService.debounce(() => findLocation(value), 1000)
			debounceSendRequest()
		}
	}

	// useEffect(()=>{
	//   if(searchInput){

	//   }

	// },[searchInput])

	return (
		<section className='search-filter'>
			<FormControl variant='standard' className='form-control'>
				<Autocomplete
					options={Object.keys(options)}
					renderOption={(props, option) => (
						<option {...props} value={option}>
							{option}
						</option>
					)}
					onChange={changeHandler}
					renderInput={params => (
						<TextField
							{...params}
							onChange={changeHandler}
							label='Select an option'
							variant='outlined'
							// value={searchInput.name}
						/>
					)}
				/>

				{/* <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        defaultValue='tel aviv'
        onChange={changeHandler}
       
      /> */}
				{error && <FormHelperText id='component-error-text'>Error</FormHelperText>}
			</FormControl>
		</section>
	)
}
