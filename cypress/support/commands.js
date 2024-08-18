// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('verifyLink', (index, text, link) => {
  cy.get("a")
			.eq(index)
			.should("have.text", text)
			.and("have.attr", "href", link)
})

Cypress.Commands.add('veryMessage', (text, visibility) => {
	cy.get('#message').should('have.text', text).and(visibility)
})

Cypress.Commands.add('yourFirstMove', (selectedPiece, moveTo) => {
  cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you1.gif').click()
	// After an orange piece is selected the image changes
	cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you2.gif')
	// Select a grey space to move the piece to
	cy.get(`img[name=${moveTo}]`).should('have.attr','src','gray.gif').click()
})

Cypress.Commands.addAll({
  verifyLink(index, text, link) {},
  verifyMessage(text, visibility) {},
  yourFirstMove(selectedPiece, moveTo) {},
})