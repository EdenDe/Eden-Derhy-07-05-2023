describe('weather page', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('fails on unhandled rejection', () => {
		cy.visit('/', {
			onBeforeLoad(win) {
				win.addEventListener('unhandledrejection', event => {
					const msg = `UNHANDLED PROMISE REJECTION: ${event.reason}`

					// fail the test
					throw new Error(msg)
				})
			},
		})
	})

	it('favorites set', () => {
		cy.window().then(win => {
			const favorites = JSON.parse(win.localStorage.getItem('favorites')) || []

			cy.window()
				.its('store')
				.invoke('dispatch', { type: 'setFavorites' })
				.then(() => {
					const getFavorites = win => win.store.getState().location.favorites
					cy.window().then(getFavorites).should('have.length', favorites.length)
				})
		})
	})

	it('links works', () => {
		cy.get('a').contains('Favorites').click()
		cy.url().should('include', 'favorite')

		cy.get('.logo').click()
		cy.url().should('not.include', 'favorite')
	})

	context('userPref', () => {
		beforeEach(() => {
			cy.get('.btn-settings').focus().click({ force: true })
			cy.get('.settings-popper').should('be.visible')
		})
		it('change to dark mode', () => {
			cy.get('[value="dark"]').click()
			cy.getCookie('mode').should('exist').and('have.a.property', 'value', 'dark')
			cy.window()
				.its('store')
				.invoke('getState')
				.its('userPref')
				.should('have.a.property', 'mode', 'dark')
		})

		it('change to light mode', () => {
			cy.get('[value="light"]').click()
			cy.getCookie('mode').should('exist').and('have.a.property', 'value', 'light')
			cy.window()
				.its('store')
				.invoke('getState')
				.its('userPref')
				.should('have.a.property', 'mode', 'light')
		})

		it('change to C tempUnit', () => {
			cy.get('[value="C"]').click()
			cy.getCookie('tempUnit').should('exist').and('have.a.property', 'value', 'C')
			cy.window()
				.its('store')
				.invoke('getState')
				.its('userPref')
				.should('have.a.property', 'tempUnit', 'C')
		})

		it('change to F tempUnit', () => {
			cy.get('[value="F"]').click()
			cy.getCookie('tempUnit').should('exist').and('have.a.property', 'value', 'F')
			cy.window()
				.its('store')
				.invoke('getState')
				.its('userPref')
				.should('have.a.property', 'tempUnit', 'F')
		})
	})
})
