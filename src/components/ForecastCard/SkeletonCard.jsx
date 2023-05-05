import React from 'react'
import { Card, Skeleton } from '@mui/material'
import './ForecastCard.scss'

export default function SkeletonCard() {
	return (
		<Card className='forecast-card grid skeleton'>
			<Skeleton variant='rect' className='img-wrapper' />
			<Skeleton variant='text' className='title' />
			<Skeleton variant='text' className='temp-details' />
		</Card>
	)
}
