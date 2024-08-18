describe("Checkers Game UI", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should("include", "/checkers")
  })

  it("Should check page structure and have functional board", () => {
		const rulesHref = "https://en.wikipedia.org/wiki/English_draughts#Starting_position"
		cy.get("h1").should("have.text", "Checkers")

		cy.get(".content").within(() => {
		  cy.get("#board") // game board

      cy.verifyMessage("Select an orange piece to move.", "be.visible")
      cy.yourFirstMove("space02", "space13")
      cy.verifyMessage("Make a move.", "be.visible")
			cy.wait(1000) // bad practice but no other way
			cy.get('img[name="space51"]').should('have.attr','src','you1.gif').click()
			cy.get('img[name="space15"]').click()
			cy.verifyMessage("This is an invalid move.", "be.visible")
	  
			cy.get("a").should("have.length", 2)
			cy.verifyLink(0, "Restart...", "./")
			cy.verifyLink(1, "Rules", rulesHref)

		  cy.request(rulesHref).its("status").should("eq", 200)
		})

		cy.get('#navigation').within(() => {
			cy.get('a').should('have.attr', 'href', '/')
			cy.get('img').should('have.attr', 'src', '/image/logo.png').and('have.attr', 'alt', 'Games for the Brain')

			cy.get('#footer').within(() => {
				cy.get('a').should('have.length', 3)
				cy.verifyLink(0, "Games for the Brain", "/")
				cy.verifyLink(1, "Bonus Room", "/bonus/")
				cy.verifyLink(2, "About", "/about/")
			})
		})
  })
})
