import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AppHeader() {
	function toggleTheme() {
		document.body.classList.toggle('dark-mode')
	}

	return (
		<header className='app-header flex'>
			<NavLink to='/'>
				<h1 className='logo'> Weather </h1>
			</NavLink>

			<section className='nav-bar flex'>
				<NavLink to='/'> Home </NavLink>
				<NavLink to='/favorite'> Favorites </NavLink>
			</section>

			<button className='btn-theme' onClick={toggleTheme}></button>
		</header>
	)
}
