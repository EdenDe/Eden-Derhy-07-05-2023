import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeContext } from './themeContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getDesignTokens } from './customTheme'

export default function ThemeContextWrapper(props) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light')

	const theme = useMemo(() => {
		return createTheme(getDesignTokens(mode))
	}, [mode])

	const toggleTheme = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
			},
		}),
		[]
	)

	return (
		<ThemeContext.Provider value={{ toggleTheme, theme }}>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</ThemeContext.Provider>
	)
}
