import { loginToTestClerk, taskList } from './test-values';
it('should display a completed message if the task is complete and the route is accessed by mistake', () => {
  loginToTestClerk('svg-test+clerk_test@example.com');
  cy.visit('http://localhost:3000/tasks/personal-information-waiver');
  cy.contains(
    'このタスクはすでに完了しています。新しいアップロードは必要ありません。'
  ).should('be.visible');
});
