describe("Deck of Cards API", () => {
	beforeEach(() => {
		cy.visit("https://www.deckofcardsapi.com/")
		cy.url().should("include", "deckofcardsapi")
  })

  it('Should GET the back of card image', () => {
    cy.request("https://www.deckofcardsapi.com/static/img/back.png").should(response => {
      expect(response.status).to.equal(200)
      expect(response.headers).to.have.property('content-type').to.eq('image/png')
    })
  });
})

// Shuffle Cards
// Draw a Card
// ReShuffle Cards
// New Deck
// Partial Deck
// Adding to Piles
// Shuffle Piles
// Listing Cards in Piles
// Drawing from Piles
// Returning Cards to Deck
