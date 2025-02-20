import { defineConfig } from "cypress"; 
import {clerkSetup} from '@clerk/testing/cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {},
    indexHtmlFile: "cypress/support/component-index.html",
    viewportWidth: 1000,
    viewportHeight: 660,
  },

  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({config})
    },
    baseUrl: "http://localhost:3000"
  },
});
