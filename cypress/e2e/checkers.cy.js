describe("Checkers Game UI", () => {
	beforeEach(() => {
		cy.visit("https://www.gamesforthebrain.com/game/checkers/")
		cy.url().should("include", "/checkers")
  })

  it("should have header, game content, navigation, and footer", () => {
	const rulesHref =
	  "https://en.wikipedia.org/wiki/English_draughts#Starting_position"
	// // cy.window().then(win => {
	// })
	cy.get("h1").should("have.text", "Checkers")

	cy.get(".content").within(() => {
	  cy.get("#board") // game board
	  cy.get("a").should("have.length", 2)

	  cy.get("a")
		.eq(0)
		.should("have.text", "Restart...")
		.and("have.attr", "href", "./")

	  cy.get("a")
		.eq(1)
		.should("have.text", "Rules")
		.and("have.attr", "href", rulesHref)

	  cy.request(rulesHref).its("status").should("eq", 200)
	})

	// Test “Checkers” header and url but also check footer links
	// restart & rules links
	// "games for brains" icon (acts like home button)
	// footer (about, bonus room links)
  })
  // Messages:
  // After init - “Select an orange piece to move”

  // “Click on your orange piece, then click where you want to move it.” - Ex: if you click on a blue piece

  // Make a move

  // please wait

  // move diagonally only

  // “This is an invalid move” - trying to  jump a valid blue piece on a square not touching your piece
})
