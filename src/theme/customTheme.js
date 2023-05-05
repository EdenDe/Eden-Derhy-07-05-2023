export const getDesignTokens = mode => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: {
						main: '#fff',
					},
					divider: '#e8eaed',
					text: {
						primary: '#202124',
						secondary: '#919191',
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
					},
			  }),
	},
})
