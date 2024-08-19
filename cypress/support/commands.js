Cypress.Commands.add('verifyLink', (index, text, link) => {
  cy.get("a")
			.eq(index)
			.should("have.text", text)
			.and("have.attr", "href", link)
})

Cypress.Commands.add('verifyMessage', (text, visibility) => {
	cy.get('#message').should('have.text', text).and(visibility)
})

Cypress.Commands.add('yourFirstMove', (selectedPiece, moveTo) => {
  cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you1.gif').click()
	// After an orange piece is selected the image changes
	cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you2.gif')
	// Select a grey space to move the piece to
	cy.get(`img[name=${moveTo}]`).should('have.attr','src','gray.gif').click()
})
