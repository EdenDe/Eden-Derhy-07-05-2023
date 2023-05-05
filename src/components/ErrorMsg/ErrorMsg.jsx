import React, { useEffect, useState } from 'react'
import { ReactComponent as ErrorSvg } from '../../assets/svg/not_found.svg'
import '../ErrorMsg/ErrorMsg.scss'

export default function ErrorMsg({ error, resetErrorBoundary }) {
	return (
		<div className='error-msg grid'>
			<ErrorSvg />
			<p>Something went wrong</p>
			{error?.message && <pre style={{ color: 'red' }}>{error.message}</pre>}
			<button className='btn-try-again' onClick={() => resetErrorBoundary()}>
				Load last search
			</button>
		</div>
	)
}
