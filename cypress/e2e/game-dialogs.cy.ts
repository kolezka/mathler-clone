describe('Game', () => {
  it('shows success dialog at the end', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').type('8/4+11').type('{Enter}')
    const $successDialog = cy.get('success-dialog');
    $successDialog.should('exist');
    const $restartButton = $successDialog.shadow().get('button');  
    $restartButton.should('exist').contains('Restart');
    $restartButton.click();
    $successDialog.should('not.exist')
  });
  it('shows fail dialog', () => {
    cy.visit('http://localhost:5173')
    for (let i = 0; i < 6; i++) {
      cy.get('body').type('100-87').type('{Enter}')
    }
    const $failDialog = cy.get('fail-dialog');
    $failDialog.should('exist');
    const $tryAgainButton = $failDialog.shadow().get('#try-again-button')
    $tryAgainButton.contains('Try again');
    $tryAgainButton.click();
    $failDialog.should('not.exist')
  });
  it('shows help dialog', () => {
    cy.visit('http://localhost:5173')
    cy.get('mathler-game').shadow().find('#help-button').click();
    cy.get('game-dialog').contains('How to play?')
    cy.get('game-dialog').contains('Try to find the hidden calculation in 6 guesses!')
    cy.get('game-dialog').get('#close-button').click();
    cy.get('game-dialog').should('not.exist');
  })
})