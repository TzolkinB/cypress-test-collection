describe("Checkers Game Messages", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should('include', '/checkers')
  })

	it('Should display message "Select an orange piece to move." on init', () => {
		cy.get('.content').within(() => {
			cy.verifyLink(0, "Restart...", "./")	
			cy.verifyMessage("Select an orange piece to move.", "be.visible")
		})
	})

	it('Should display message "Click on your orange piece, then click where you want to move it"', () => {
		// Ex: This message displays if you click on a blue piece
		cy.get('.content').within(() => {
			cy.get('img[name="space55"]').click()
			cy.verifyMessage("Click on your orange piece, then click where you want to move it.", "be.visible")
		})
	})

	it('Should display message "Make a move."', () => {
		cy.get('.content').within(() => {
			cy.yourFirstMove("space42", "space33")
			cy.verifyMessage("Make a move.", "be.visible")
		})
	})

	it('Should display message "Move diagonally only."', () => {
		cy.get('.content').within(() => {
			cy.yourFirstMove("space42", "space33")
			// Make sure it is your turn to move again
			cy.verifyMessage("Make a move.", "be.visible")
			// Bug in code and full path instead of img file
			cy.get('img[src$="me2.gif"]').should('not.exist')
			cy.get('img[name="space33"]').should('have.attr','src','you1.gif').click()
			// Select a grey space horizontal to your location to move the piece to
			cy.get('img[name="space53"]').click()
			cy.verifyMessage("Move diagonally only.", "be.visible")
		})
	})

	it('Should display message "Please wait."', () => {
		cy.get('.content').within(() => {
			cy.yourFirstMove("space42", "space33")
			// Make sure it is your turn to move again
			cy.verifyMessage("Make a move.", "be.visible")
			cy.get('img[name="space33"]').should('have.attr','src','you1.gif').click()
			// Select a grey space horizontal to your location to move the piece to
			cy.get('img[name="space53"]').click()
			cy.verifyMessage("Please wait.", "be.visible")
		})
	})

	it('Should display message "This is an invalid move."', () => {
		cy.get('.content').within(() => {
			cy.yourFirstMove("space42", "space53")
			// Make sure it is your turn to move again
			cy.verifyMessage("Make a move.", "be.visible")
			cy.get('img[src$="me2.gif"]').should('not.exist')
			cy.get('img[name="space51"]').should('have.attr','src','you1.gif').click()
			cy.get('img[name="space15"]').click()
			cy.verifyMessage("This is an invalid move.", "be.visible")
		})
	})
})