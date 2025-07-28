///<reference types='cypress'/>

describe('Cypress Playground', () => {

  beforeEach(() => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html');
  });

  it('clicar em inscrever-se e verificar mensagem', () => {
    cy.get('button[type="submit"]').click();

    // Aguarda até 10 segundos para que a mensagem apareça
    cy.get('#success', { timeout: 10000 }) // 10 segundos
      .should('be.visible')
      .and('contain', "You've been successfully subscribed to our newsletter.");
  });
});
