describe("Deck of Cards API", () => {
	beforeEach(() => {
		cy.visit("https://www.deckofcardsapi.com/")
		cy.url().should("include", "deckofcardsapi")
  })

  it.only('Should shuffle a deck of card, draw 10 cards', () => {
    // Shuffle Cards
    cy.request("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      expect(response.body).to.have.property('shuffled').to.eq(true)
      expect(response.body.shuffled).to.eq(true)
      expect(response.body.remaining).to.eq(52)

    const deckID = response.body.deck_id

    // Draw Cards
    cy.request(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=10`).then(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      expect(response.body.cards).to.have.length(10)
      expect(response.body.remaining).to.eq(42)

      const cardArray = response.body.cards
      const cardCodes = cardArray.map(card => card.code)
      // Out of 10 drawn cards, set aside 4 in a pile
      const cardValues = cardCodes.slice(6).join()

    // Add Drawn Cards to Piles
    cy.request(`https://www.deckofcardsapi.com/api/deck/${deckID}/pile/pile1Cards/add/?cards=${cardValues}`).then(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      assert.isObject(response.body.piles, "Response body 'piles' property is an object")
      expect(response.body.piles.pile1Cards.remaining).to.eq(4)
    })
    })
    }) 
  })

  // ReShuffle Cards
  //https://www.deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
  //https://www.deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/?remaining=true

  // Shuffle Piles
  // https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/shuffle/

  // Listing Cards in Piles
  // https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/

  // Drawing from Piles
  // https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?cards=AS

  // Returning Cards to Deck
  //https://www.deckofcardsapi.com/api/deck/<<deck_id>>/return/

  // Partial Deck -- WIP
  // https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH

  it('Should GET a partial deck)', () => {
    cy.request("https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,KS,AD,2D,KD,AC,2C,KC,AH,2H,KH").should(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Should draw cards from a new shuffled deck)', () => {
    cy.request("https://www.deckofcardsapi.com/api/deck/new/draw/?count=2").should(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      expect(response.body.cards).to.have.length(2)
      expect(response.body.remaining).to.eq(50)
    })
  })

  // Brand New Deck
  it('Should GET a new deck of cards (with/without Jokers)', () => {
    cy.request("https://www.deckofcardsapi.com/api/deck/new").should(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      // New deck would not be shuffled yet and standard deck is 52 cards
      expect(response.body.shuffled).to.eq(false)
      expect(response.body.remaining).to.eq(52)
    })

    // New deck w/ Jokers
    cy.request("https://www.deckofcardsapi.com/api/deck/new?jokers_enabled=true").should(response => {
      expect(response.status).to.equal(200)
      expect(response.body.remaining).to.eq(54)
    })
  })

  // Back of Card Image
  it('Should GET the back of card image', () => {
    cy.request("https://www.deckofcardsapi.com/static/img/back.png").should(response => {
      expect(response.status).to.equal(200)
      expect(response.headers).to.have.property('content-type').to.eq('image/png')
    })
  })

  it('Should shuffle 2 decks of cards', () => {
    cy.request("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2").then(response => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
      expect(response.body.shuffled).to.eq(true)
      expect(response.body.remaining).to.eq(104)
    })
  })
})