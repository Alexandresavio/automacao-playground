///<reference types='cypress' />
describe('Cypress Playground', () => {
  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html');
  })

  it('shows a promotional banner', () => {
    // implementação do teste aqui.
    cy.get('#promotional-banner').should('be.visible');
  })

  it('clicks the Subscribe button and shows a success message', () => {
    cy.get('button[type="submit"]').click();
    cy.get('#success')
      .should('be.visible')
      .and('contain', "You've been successfully subscribed to our newsletter.");

  })
})
