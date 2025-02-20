import AnimatedButton from '@/app/components/AnimatedButton'
import { Home } from 'lucide-react' // or any other icon you want to use

describe('AnimatedButton', () => {
  it('renders correctly', () => {
    cy.mount(
      <AnimatedButton
        href="/some-path"        // Required string for the link
        icon={Home}             // Required icon component
        text="Click Me"         // Required text
        ariaLabel="Home button" // Required aria label
      />
    )


    // Add your assertions here
    cy.get('a').should('have.attr', 'href', '/some-path')
    cy.get('span').should('contain', 'Click Me')
  })
})
