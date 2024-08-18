describe("Checkers Game UI", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should("include", "/checkers")
  })

  it("Should have header, game content, navigation, and footer", () => {
		const rulesHref = "https://en.wikipedia.org/wiki/English_draughts#Starting_position"
		cy.get("h1").should("have.text", "Checkers")

		cy.get(".content").within(() => {
		  cy.get("#board") // game board
	  
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
