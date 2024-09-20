describe("Deck of Cards API", () => {
	beforeEach(() => {
		cy.visit("/")
		cy.url().should("include", "deckofcardsapi")
  })

  const successStatusObjBody = (response) => {
      expect(response.status).to.equal(200)
      assert.isObject(response.body, "Response body is an object")
  }

  it('Should shuffle a deck of cards, draw cards, make a pile, return cards to deck and draw from pile', () => {
    // Shuffle Cards
    cy.log('Shuffle the deck')
    cy.request("/api/deck/new/shuffle/?deck_count=1").then(response => {
      const deckID = response.body.deck_id
      successStatusObjBody(response)
      expect(response.body).to.have.property('shuffled').to.eq(true)
      expect(response.body.shuffled).to.eq(true)
      expect(response.body.remaining).to.eq(52)
      
      // Draw Cards
      cy.log('Draw 12 cards')
      cy.request(`/api/deck/${deckID}/draw/?count=12`).then(response => {
        const pileName = 'pile1Cards'
        const cardArray = response.body.cards
        const cardCodes = cardArray.map(card => card.code)
        // Out of 12 drawn cards, set aside 8 in a pile
        const cardValues = cardCodes.slice(4).join()
        // If only want heart cards
        const heartCards = cardArray.filter(cards => cards.suit === "HEARTS")
        cy.log('heartCards', heartCards)

        successStatusObjBody(response)
        expect(response.body.cards).to.have.length(12)
        expect(response.body.remaining).to.eq(40)
        
        // Add Drawn Cards to Piles
        cy.log('Add 8 cards to a pile')
        cy.request(`/api/deck/${deckID}/pile/${pileName}/add/?cards=${cardValues}`).then(response => {
          successStatusObjBody(response)
          assert.isObject(response.body.piles, "Response body 'piles' property is an object")
          expect(response.body.piles.pile1Cards.remaining).to.eq(8)

          // List Cards in the Pile
          cy.request(`/api/deck/${deckID}/pile/${pileName}/list/`).then(response => {
            successStatusObjBody(response)
            expect(response.body.piles.pile1Cards.cards).to.deep.eq(cardArray.slice(4))

            // Shuffle Pile
            cy.log('Shuffle the pile of 8 cards')
            cy.request(`/api/deck/${deckID}/pile/${pileName}/shuffle/`).then(response => {
              successStatusObjBody(response)

              // List Cards in the Pile
              cy.request(`/api/deck/${deckID}/pile/${pileName}/list/`).then(response => {
                const shuffledCardPile = response.body.piles.pile1Cards.cards
                expect(response.body.piles.pile1Cards.cards).to.not.deep.eq(cardArray.slice(4))

                // Return Cards to Deck
                // Return the remaining 4 cards in your hand that you did not put in the pile
                cy.log('Return cards not in a pile to the deck')
                cy.request(`/api/deck/${deckID}/return/`).then(response => {
                  successStatusObjBody(response)
                  expect(response.body.remaining).to.eq(44)

                  // Reshuffle Cards in Deck
                  // remaining=true only shuffles cards in main stack, not piles or cards drawn
                  cy.request(`/api/deck/${deckID}/shuffle/?remaining=true`).then(response => {
                    successStatusObjBody(response)
                    expect(response.body.shuffled).to.eq(true)
                    expect(response.body.remaining).to.eq(44)

                    // Draw Cards from Pile
                    cy.request(`/api/deck/${deckID}/pile/${pileName}/draw/bottom/?count=2`).then(response => {
                      successStatusObjBody(response)
                      expect(response.body.piles.pile1Cards.remaining).to.eq(6)
                      expect(response.body.cards).to.deep.eq(shuffledCardPile.slice(0,2))
                    })
                  })
                })
              })
            })
          })
        })
      })
    }) 
  })

  // Partial Deck
  it('Should GET a partial deck', () => {
    cy.request("/api/deck/new/shuffle/?cards=AS,AD,AC,AH,KS,KD,KC,KH,QS,QD,QC,QH,JS,JD,JC,JH").should(response => {
      successStatusObjBody(response)
      expect(response.body.shuffled).to.eq(true)
      expect(response.body.remaining).to.eq(16)
    })
  })

  // Brand New Deck
  it('Should GET a new deck of cards (with/without Jokers)', () => {
    cy.request("api/deck/new").should(response => {
      successStatusObjBody(response)
      // New deck would not be shuffled yet and standard deck is 52 cards
      expect(response.body.shuffled).to.eq(false)
      expect(response.body.remaining).to.eq(52)
    })

    // New deck w/ Jokers
    cy.request("/api/deck/new?jokers_enabled=true").should(response => {
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
    cy.request("/api/deck/new/shuffle/?deck_count=2").then(response => {
      successStatusObjBody(response)
      expect(response.body.shuffled).to.eq(true)
      expect(response.body.remaining).to.eq(104)
    })
  })

  it('Should draw cards from a new shuffled deck', () => {
    cy.request("/api/deck/new/draw/?count=2").should(response => {
      successStatusObjBody(response)
      expect(response.body.cards).to.have.length(2)
      expect(response.body.remaining).to.eq(50)
    })
  })
})