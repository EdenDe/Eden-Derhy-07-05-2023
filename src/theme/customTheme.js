export const getDesignTokens = mode => ({
	typography: {
		fontFamily: [
			'didactGothic',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#202124',
					},

					divider: '#e8eaed',
					text: {
						primary: '#202124',
						secondary: '#919191',
						disabled: 'red',
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: '#ecc456',
					},

					divider: '#ffe168',
					background: {
						default: '#202124',
						paper: '#555555',
					},
					text: {
						primary: '#e8eaed',
						secondary: '#fff',
						disabled: 'red',
					},
			  }),
	},
})
