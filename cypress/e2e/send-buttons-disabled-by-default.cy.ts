import { loginToTestClerk, taskList } from './test-values';
it('has disabled 送信 buttons by default', () => {
  loginToTestClerk('justin+clerk_test@example.com');

  taskList.forEach(({ text, href }) => {
    cy.contains(text)
      .should('be.visible')
      .and('have.attr', 'href', href)
      .click();

    cy.url().should('include', href);
    cy.get('a')
      .eq(1)
      .as('submitButton')
      // .and('have.attr', 'tabindex', '-1')
      // .and('have.attr', 'aria-label', 'Submit File Upload')
      .get('span')
      .contains('送信')
      .should('be.visible');
    cy.get('@submitButton')
      .invoke('attr', 'class')
      .should('contain', 'pointer-events-none');

    cy.go('back');
  });
});
