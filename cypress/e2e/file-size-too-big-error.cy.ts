import { loginToTestClerk, taskList } from './test-values';
it('gets the proper error message when there is a database error', () => {
  loginToTestClerk('justin+clerk_test@example.com');

  taskList.forEach(({ text, href }) => {
    cy.contains(text)
      .should('be.visible')
      .and('have.attr', 'href', href)
      .click()
      .wait(3000);

    cy.url().should('include', href);
    cy.get('a')
      .eq(0)
      .as('fileSelectButton')
      .get('span')
      .contains('ファイルを選択')
      .should('be.visible');
    cy.get('input[type=file]').selectFile('large-test.txt', { force: true });
    cy.get('a').eq(2).click();
    cy.get('p[role=alert]')
      .contains(
        'ドキュメントのアップロードに問題が発生しました。この問題が続く場合は、管理者にご連絡ください。'
      )
      .should('be.visible');

    cy.go('back');
  });
});
