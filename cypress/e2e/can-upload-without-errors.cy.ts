import { taskList, loginToTestClerk } from './test-values';
it('selects a file, uploads it, and recieves the proper success message', () => {
  loginToTestClerk('goojustin+clerk_test@example.com');

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
    cy.get('input[type=file]').selectFile('test.txt', { force: true });
    cy.get('@fileSelectButton')
      .get('span')
      .contains('test.txtを選択しています')
      .should('be.visible');
    cy.get('a').eq(2).click();
    cy.get('p[role=alert]')
      .contains('"成功！ファイルが暗号化されアップロードされました。"')
      .should('be.visible');

    cy.go('back');
  });

  taskList.forEach(({ text, href }) => {
    cy.contains(text)
      .should('be.visible')
      .and('have.attr', 'href', href)
      .get('svg')
      .eq(2)
      .invoke('attr', 'class')
      .should('contain', 'lucide-loader-pinwheel');
  });
});
