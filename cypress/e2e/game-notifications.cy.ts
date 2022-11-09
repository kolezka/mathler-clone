describe('Game', () => {
  it('shows invalid expression notification', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').type('10++10').type('{Enter}')
    cy.get('mathler-game').shadow().find('game-notifications').get('.notification').should('have.text', 'The given expression is an incorrect mathematical expression or is the number itself.')
  });
  it('shows invalid result notificaiton', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').type('100-50').type('{Enter}')
    cy.get('mathler-game').shadow().find('game-notifications').get('.notification').should('have.text', 'The result of the expression should be 13')
  });
  it('shows too short notificaiton', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').type('1+1').type('{Enter}')
    cy.get('mathler-game').shadow().find('game-notifications').get('.notification').should('have.text', 'The specified expression is too short. It should fill all the columns.')
  });
})