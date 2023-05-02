import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton } from '@mui/material'
import { ThemeContext } from '../../theme/themeContext'
import './AppHeader.scss'

export default function AppHeader() {
	const theme = useTheme()

	const toggleTheme = useContext(ThemeContext)

	return (
		<header className={`app-header full main-layout ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'} `}>
			<section className='flex align-center'>
				<NavLink to='/'>
					<h1 className='logo'> Weather </h1>
				</NavLink>

				<section className='nav-bar flex'>
					<NavLink to='/'> Home </NavLink>
					<NavLink to='/favorite'> Favorites </NavLink>
				</section>
				<IconButton sx={{ ml: 1 }} onClick={toggleTheme.toggleColorMode} color='inherit'>
					{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</section>
		</header>
	)
}
