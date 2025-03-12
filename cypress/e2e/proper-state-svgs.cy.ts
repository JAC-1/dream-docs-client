import { loginToTestClerk } from './test-values';
it('shows the the right status svgs for the document submission state', () => {
  loginToTestClerk('svg-test+clerk_test@example.com');
  cy.contains('留学免責同意書')
    .should('be.visible')
    .get('svg')
    .eq(2)
    .invoke('attr', 'class')
    .should('contain', 'lucide-loader-pinwheel');
  cy.contains('個人情報同意書').get(
    'svg.lucide.lucide-badge-check.h-5.w-5.sm\\:h-6.sm\\:w-6.text-green-500'
  );
  cy.contains('志願理由書').get(
    'svg.lucide.lucide-circle-alert.h-5.w-5.sm\\:h-6.sm\\:w-6.text-red-500'
  );
});
