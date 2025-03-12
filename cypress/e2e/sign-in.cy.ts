import { loginToTestClerk, taskList } from './test-values';

it('sign in and verrify items', () => {
  loginToTestClerk('justin+clerk_test@example.com');

  cy.get('h1').should('contain', '提出リスト').should('be.visible');

  taskList.forEach(({ text, href }) => {
    cy.contains(text).should('be.visible').and('have.attr', 'href', href);
  });
});
