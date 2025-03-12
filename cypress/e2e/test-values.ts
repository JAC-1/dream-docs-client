const taskList = [
  { text: '留学免責同意書', href: '/tasks/study-abroad-waiver' },
  { text: '個人情報同意書', href: '/tasks/personal-information-waiver' },
  { text: '志願理由書', href: '/tasks/why-study-canada' },
  { text: 'ホストファミリーへの手紙', href: '/tasks/homestay-letter' },
  { text: 'パスポートのカラーコピー', href: '/tasks/passport' },
  { text: '証明写真', href: '/tasks/headshot' },
  { text: '予防接種記録', href: '/tasks/immunization-record' },
  { text: '家族写真', href: '/tasks/family-images' },
];

const loginToTestClerk = (testEmail: string) => {
  cy.visit(`/`);
  cy.clerkSignIn({
    strategy: 'email_code',
    identifier: testEmail,
  });
};

export { taskList, loginToTestClerk };
