describe('Game Board', () => {
  it('is updated when player uses DOM keyboard', () => {
    cy.visit('/')
    const buttons = ['1', '0', '0', '-', '8', '7', 'Enter']
    for (const button of buttons) {
      cy.get('mathler-game').shadow().find('game-keyboard').find('button').contains(button).click();
    }
    cy.get('mathler-game').shadow().find('#row-0').should('have.text', '100-87');
  })
  it('is updated when player uses keyboard', () => {
    cy.visit('/')
    const type = '100-87'
    cy.get('body').type(type)
    cy.get('mathler-game').shadow().find('#row-0').should('have.text', type);
  })
  it('marks guesses', () => {


    cy.get('body').type('100-87').type('{Enter}')
    cy.get('body').type('8/4+11').type('{Enter}')
    cy.get('mathler-game').shadow().find('#row-0-col-0 .value').should('have.class', 'value--different-place')
    cy.get('mathler-game').shadow().find('#row-0-col-1 .value').should('have.class', 'value--not-in-solution')
    cy.get('mathler-game').shadow().find('#row-1-col-0 .value').should('have.class', 'value--correct')
  })
})