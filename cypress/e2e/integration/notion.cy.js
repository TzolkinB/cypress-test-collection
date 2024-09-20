// Tests for patterns found on Usage page
// https://kimbellcypress.notion.site/Usage-bd2edeebefff4f6ebbdf3b681a03ead1
describe("Test patterns for common UI elements", () => {
	beforeEach(() => {
		cy.visit("https://practice-automation.com/")
    cy.findByText('Welcome to your software automation practice website!')
  })

  it("should have heading, input, and select patterns", () => {
    // Link when you will actually be clicking on the link and navigating to a new page
    cy.findByRole('link',  { name: 'Form Fields' } )
      .should('have.attr', 'href', 'https://practice-automation.com/form-fields/')
      .click()
    cy.url().should('include', '/form-fields')

    // Heading
    cy.findByRole('heading', { name: 'Form Fields', level: 1 })

    // Input
    // cy/findByLabelText is preferred but did not work on this example
    cy.findByRole('textbox', { name: 'Name' }).as('nameInput')
    cy.get('@nameInput').should('be.empty')
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('@nameInput').type('Tom John').should('have.value', 'Tom John')

    // Select
    cy.findByRole('combobox', { name: '', value: 'default' }).as('automationSelect')
    // Check the options are as expected
    const optionValues = ['default', 'yes', 'no', 'undecided']
    cy.get('@automationSelect').children('option').then(options => {
      const values = [...options].map(o => o.value)
      expect(values).to.deep.equal(optionValues)
    })
    // Select a new option
    cy.get('@automationSelect').select('Yes')
    cy.get('@automationSelect').should('have.value', 'yes')
  })

  it('should have checkbox, radio, and button patterns', () => {
    // Link when you will actually be clicking on the link and navigating to a new page
    cy.findByRole('link',  { name: 'Form Fields' } )
      .should('have.attr', 'href', 'https://practice-automation.com/form-fields/')
      .click()
    cy.url().should('include', '/form-fields')
  
    // Checkbox
    cy.findAllByRole('checkbox', { checked: false }).should('have.length', 5)
    cy.findByRole('checkbox', { name: 'Water', checked: false }).check()
    cy.findByRole('checkbox', { name: 'Water' }).should('be.checked')

    // Radio
    cy.findAllByRole('radio', { checked: false }).should('have.length', 5)
    cy.findByRole('radio', { name: 'Red', checked: false }).check()
    cy.findByRole('radio', { name: 'Red' }).should('be.checked')

    // Button
    cy.findByRole('button', { name: 'Submit' }).click()
  })

  it.skip('should have tooltip pattern', () => {
    // Link when you will actually be clicking on the link and navigating to a new page
    cy.findByRole('link',  { name: 'Popups' } )
      .should('have.attr', 'href', 'https://practice-automation.com/popups/')
      .click()
    cy.url().should('include', '/popups')

    // tooltip - this example is click not hover
    cy.get('.tooltip_1').trigger('mouseover')
    cy.findByRole('tooltip')
    cy.get('.tooltip_1').trigger('mouseout')
  })
})