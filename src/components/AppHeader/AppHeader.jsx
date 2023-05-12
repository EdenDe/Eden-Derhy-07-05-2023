import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
	Menu as MenuIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material'
import {
	ClickAwayListener,
	IconButton,
	MenuItem,
	MenuList,
	Paper,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import './AppHeader.scss'

export default function AppHeader({ mode, setMode, tempUnit, setTempUnit }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [settingsOpen, setSettingsOpen] = useState(false)

	function toggleMenu() {
		setMenuOpen(prevState => !prevState)
	}

	function toggleSettings() {
		setSettingsOpen(prevState => !prevState)
	}

	function ToggleGroup({ toggleType, options, currentValue, toggleFunc }) {
		return (
			<ToggleButtonGroup
				className='toggle-btn-group'
				value={currentValue}
				exclusive
				onChange={(ev, newValue) => toggleFunc(newValue || currentValue)}
			>
				{options.map((option, index) => (
					<ToggleButton value={option} key={option + index}>
						{toggleType === 'mode' && (
							<>
								<span>{option} </span>
								{option === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
							</>
						)}
						{toggleType === 'tempUnit' && <span data-temp-unit={option}></span>}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		)
	}

	function Menu() {
		return (
			<div className='settings-menu'>
				<IconButton onClick={toggleSettings} className='btn-settings'>
					<SettingsIcon />
				</IconButton>
				<Paper hidden={!settingsOpen} className='settings-popper'>
					<ClickAwayListener onClickAway={() => setSettingsOpen(false)}>
						<MenuList>
							<MenuItem className='menu-item'>
								<ToggleGroup
									toggleType='mode'
									options={['dark', 'light']}
									currentValue={mode}
									toggleFunc={setMode}
								/>
							</MenuItem>
							<MenuItem className='menu-item'>
								<ToggleGroup
									toggleType='tempUnit'
									options={['C', 'F']}
									currentValue={tempUnit}
									toggleFunc={setTempUnit}
								/>
							</MenuItem>
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</div>
		)
	}

	return (
		<header className='app-header full main-layout'>
			<section className='flex align-center space-between'>
				<NavLink to='/'>
					<h1 className='logo'> Weather </h1>
				</NavLink>
				<div className=' flex'>
					<ul className={`nav-bar flex ${menuOpen ? 'open' : ''}`}>
						<NavLink to='/' onClick={toggleMenu}>
							Home
						</NavLink>
						<NavLink to='/favorite' onClick={toggleMenu}>
							Favorites
						</NavLink>
					</ul>
					<div className='action-btn flex align-center'>
						<IconButton className='nav-ham flex auto-center' color='inherit' onClick={toggleMenu}>
							<MenuIcon fill='text.primary' />
						</IconButton>
						<Menu />
					</div>
				</div>
			</section>
		</header>
	)
}
