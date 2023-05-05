import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import {
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
	Menu as MenuIcon,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import './AppHeader.scss'
import { ThemeContext } from '../../theme/themeContext'

export default function AppHeader() {
	const [menuOpen, setMenuOpen] = useState(false)
	const theme = useTheme()

	const { toggleTheme } = useContext(ThemeContext)

	return (
		<header
			className={`app-header full main-layout ${
				theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'
			} `}
		>
			<section className='flex align-center space-between'>
				<NavLink to='/'>
					<h1 className='logo'> Weather </h1>
				</NavLink>
				<div className=' flex'>
					<ul className={`nav-bar flex ${menuOpen ? 'open' : ''}`}>
						<NavLink to='/'> Home </NavLink>
						<NavLink to='/favorite'> Favorites </NavLink>
					</ul>
					<div className='action-btn flex align-center'>
						<IconButton
							className='nav-ham flex auto-center'
							color='inherit'
							onClick={() => setMenuOpen(prev => !prev)}
						>
							<MenuIcon />
						</IconButton>
						<IconButton onClick={toggleTheme.toggleColorMode} color='inherit'>
							{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</div>
				</div>
			</section>
		</header>
	)
}
