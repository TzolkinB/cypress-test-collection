describe("Checkers Game UI", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should("include", "/checkers")
  })

	const verifyLink = (index, text, link) => { 
		cy.get("a")
			.eq(index)
			.should("have.text", text)
			.and("have.attr", "href", link)
	}

	const verifyMessage = (text, visible) => {
		cy.get('#message').should('have.text', text).and(visible)
	}

	const yourFirstMove = (selectedPiece, moveTo) => {
		cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you1.gif').click()
		// After an orange piece is selected the image changes
		cy.get(`img[name=${selectedPiece}]`).should('have.attr','src','you2.gif')
		// Select a grey space to move the piece to
		cy.get(`img[name=${moveTo}]`).should('have.attr','src','gray.gif').click()
	}

  it("Should have header, game content, navigation, and footer", () => {
		const rulesHref = "https://en.wikipedia.org/wiki/English_draughts#Starting_position"
	// // cy.window().then(win => {
	// })
		cy.get("h1").should("have.text", "Checkers")

		cy.get(".content").within(() => {
		  cy.get("#board") // game board
	  
			cy.get("a").should("have.length", 2)
			verifyLink(0, "Restart...", "./")
			verifyLink(1, "Rules", rulesHref)

		  cy.request(rulesHref).its("status").should("eq", 200)
		})

		cy.get('#navigation').within(() => {
			cy.get('a').should('have.attr', 'href', '/')
			cy.get('img').should('have.attr', 'src', '/image/logo.png').and('have.attr', 'alt', 'Games for the Brain')

			// footer
			cy.get('#footer').within(() => {
				cy.get('a').should('have.length', 3)
				verifyLink(0, "Games for the Brain", "/")
				verifyLink(1, "Bonus Room", "/bonus/")
				verifyLink(2, "About", "/about/")
			})
		})
  })

	// Check Messages under playing board
	it('Should display message "Select an orange piece to move." on init', () => {
		cy.get(".content").within(() => {
			verifyLink(0, "Restart...", "./")	
			verifyMessage("Select an orange piece to move.", "be.visible")
		})
	})

	it('Should display message "Click on your orange piece, then click where you want to move it"', () => {
		// Ex: This message displays if you click on a blue piece
		cy.get(".content").within(() => {
			cy.get('img[name="space55"]').click()
			verifyMessage("Click on your orange piece, then click where you want to move it.", "be.visible")
		})
	})

	it('Should display message "Make a move."', () => {
		cy.get(".content").within(() => {
			yourFirstMove("space42", "space33")
			verifyMessage("Make a move.", "be.visible")
		})
	})

	it('Should display message "Move diagonally only."', () => {
		cy.get(".content").within(() => {
			yourFirstMove("space42", "space33")
			// Make sure it is your turn to move again
			verifyMessage("Make a move.", "be.visible")
			cy.wait(1000) // bad practice but no other way
			cy.get('img[name="space33"]').should('have.attr','src','you1.gif').click()
			// Select a grey space horizontal to your location to move the piece to
			cy.get('img[name="space53"]').click()
			verifyMessage("Move diagonally only.", "be.visible")
		})
	})
	it('Should display message "Please wait."', () => {
		cy.get(".content").within(() => {
			yourFirstMove("space42", "space33")
			// Make sure it is your turn to move again
			verifyMessage("Make a move.", "be.visible")
			cy.get('img[name="space33"]').should('have.attr','src','you1.gif').click()
			// Select a grey space horizontal to your location to move the piece to
			cy.get('img[name="space53"]').click()
			verifyMessage("Please wait.", "be.visible")
		})
	})

	it('Should display message "This is an invalid move."', () => {
		cy.get(".content").within(() => {
			yourFirstMove("space42", "space53")
			// Make sure it is your turn to move again
			verifyMessage("Make a move.", "be.visible")
			cy.wait(1000) // bad practice but no other way
			cy.get('img[name="space51"]').should('have.attr','src','you1.gif').click()
			cy.get('img[name="space15"]').click()
			verifyMessage("This is an invalid move.", "be.visible")
		})
	})
})
