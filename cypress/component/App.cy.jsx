// import React from 'react'
import App from '../../src/App'
import { mount } from 'cypress/react18'
import ScriptideProvider from '../../src/contexts/ScriptideProvider';
// import cy from 'cypress'

describe("Landing screen", () => {

  beforeEach(() => {
    mount(
      <ScriptideProvider>
        <App />
      </ScriptideProvider>
    )
  })

  it("Should successfully render initial app state", () => {
    cy.get('div').should('exist');
    cy.get('header').should('exist');
    cy.get('#App-main').should('be.visible');
    cy.get('#menu-container').should('be.visible');
  })


});