describe('Game Board', () => {
  it('is updated when player uses keyboard', () => {
    cy.visit('http://localhost:5173')
    const type = '100-87'
    cy.get('body').type(type)
    cy.get('mathler-game').shadow().find('#row-0').should('have.text', type);
  })
  it('marks guesses', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').type('100-87').type('{Enter}')
    cy.get('body').type('8/4+11').type('{Enter}')
    cy.get('mathler-game').shadow().find('#row-0-col-0 .value').should('have.class', 'value--different-place')
    cy.get('mathler-game').shadow().find('#row-0-col-1 .value').should('have.class', 'value--not-in-solution')
    cy.get('mathler-game').shadow().find('#row-1-col-0 .value').should('have.class', 'value--correct')
  })
})