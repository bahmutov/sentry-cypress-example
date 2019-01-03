/// <reference types="cypress" />
describe('Sentry Documentation', () => {
  beforeEach(() => {
    cy.visit('https://docs.sentry.io/')
  })

  it('hides accept cookies', () => {
    // note that Cypress will only click on a button
    // if the button is visible
    // https://on.cypress.io/click#Rules
    cy.get('.tracking-widget')
      // we could use ".contains" by label
      // but that button has data-accept attribute
      // which is more stable
      // http://on.cypress.io/best-practices#Selecting-Elements
      .find('[data-accept]')
      .click()
    cy.get('.tracking-widget').should('not.be.visible')
  })

  context('Node.js docs', () => {
    it('finds raven-node', () => {
      cy.get('.ais-search-box--input')
        .type('Node.js{enter}')
      cy.get('.ais-hits.list-group.search-results').should('be.visible')
        .contains('.list-group-item', 'raven-node')
        .click({force: true}) // disable visibility check
      // so many assertions to check that we find the right page ...
      cy.location('href').should('contain', '/clients/node/')
    })
  })
})
