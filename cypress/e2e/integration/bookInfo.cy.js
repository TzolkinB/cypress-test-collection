describe("Get Book Info", () => {

  it("Should have name, published year, and page number", () => {
    cy.fixture('bookUrls').then((urls) => {
      urls.map(url => {
        cy.visit(url)
        cy.url().should("include", "/book/show/")

        cy.get('[data-testid="bookTitle"]').invoke('text').should('have.length.gte', 1)
        cy.get('[data-testid="pagesFormat"]').invoke('text').should('contain', 'pages')
        cy.get('[data-testid="publicationInfo"]').invoke('text').should('contain', 'First published')
        cy.log('----------')
      })
      });
  })
})