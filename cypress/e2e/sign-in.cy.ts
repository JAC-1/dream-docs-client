// TODO: Update for Japanese if wishing to test
// it('sign in and verify task items', () => {
//   cy.visit(`/`)
//   cy.clerkSignIn({ strategy: 'email_code', identifier: 'justin+clerk_test@example.com' })
//   cy.visit('/')
//   cy.get('h1').should('contain', 'Task List')
//   cy.get('h1').should('be.visible')

// const tasks = [
//   {
//     name: 'Study Abroad Waiver',
//     href: '/study-abroad-waiver'
//   },
//   {
//     name: 'Personal Information Waiver',
//     href: '/personal-information-waiver'
//   },
//   {
//     name: 'Why I Study In Canada',
//     href: '/why-study-canada'
//   },
//   {
//     name: 'Letter to Homestay Family',
//     href: '/homestay-letter'
//   },
//   {
//     name: 'Passport',
//     href: '/passport'
//   },
//   {
//     name: 'Headshot',
//     href: '/headshot'
//   },
//   {
//     name: 'Study Abroad Application',
//     href: '/study-abroad-application'
//   },
//   {
//     name: 'Immunization Record',
//     href: '/immunization-record'
//   }
// ];

// tasks.forEach(task => {
//   cy.get(`a[href="${task.href}"]`)
//     .find('span')
//     .should('contain', task.name)
// })
// })
