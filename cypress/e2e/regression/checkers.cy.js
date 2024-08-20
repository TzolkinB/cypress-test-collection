describe("Regression - Responsive Checkers Game UI", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should('include', '/checkers')
  })

	const sizes = ["macbook-11", "ipad-2", "iphone-6"]

	sizes.forEach(size => {
		it(`Should check page structure and have functional board, ${size}`, () => {
			const rulesHref = "https://en.wikipedia.org/wiki/English_draughts#Starting_position"
			cy.get('h1').should('have.text', 'Checkers')

			cy.get('.content').within(() => {
				cy.get('#board') // game board
				cy.get('img[src="you1.gif"]').should('have.length', 12)

				cy.verifyMessage("Select an orange piece to move.", "be.visible")
				cy.yourFirstMove("space02", "space13")
				cy.verifyMessage("Make a move.", "be.visible")
				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(1000) // bad practice but no other way

				// 2nd move
				cy.get('img[name="space62"]').should('have.attr','src','you1.gif').click()
				cy.get('img[name="space53"]').click()
				cy.verifyMessage("Make a move.", "be.visible")
				// Verify computer has taken your piece, start with 12
				cy.get('img[src="you1.gif"]').should('have.length', 11)

				/*
				3rd move
				Wait until last step is complete before can continue
				*/
				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(2000) // bad practice but no other way
				cy.get('img[name="space53"]').should('have.attr','src','you1.gif').click()
				cy.get('img[name="space44"]').click()
				// Verify computer has taken your piece
				cy.get('img[src="you1.gif"]').should('have.length', 10)

				cy.get('a').should('have.length', 2)
				cy.verifyLink(0, "Restart...", "./")
				cy.verifyLink(1, "Rules", rulesHref)

				cy.request(rulesHref).its('status').should('eq', 200)
			})

			cy.get('#navigation').within(() => {
				cy.get('a')
				.should('have.attr', 'href', '/')
				.find('img').should('have.attr', 'src', '/image/logo.png')
				.and('have.attr', 'alt', 'Games for the Brain')

				cy.get('#footer').within(() => {
					cy.get('a').should('have.length', 3)
					cy.verifyLink(0, "Games for the Brain", "/")
					cy.verifyLink(1, "Bonus Room", "/bonus/")
					cy.verifyLink(2, "About", "/about/")
				})
			})
		})
	})
})
