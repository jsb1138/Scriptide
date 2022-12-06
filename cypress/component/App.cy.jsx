// import React from 'react'
import App from '../../src/App'
import { mount } from 'cypress/react18'
import ScriptideProvider from '../../src/contexts/ScriptideProvider';
import { RoomProvider } from '../../src/liveblocks.config';



describe("Landing screen", () => {

  beforeEach(() => {
    cy.viewport(1200,800)
    mount(
      <RoomProvider
      id="12678900345">
        <ScriptideProvider>
          <App />
        </ScriptideProvider>
      </RoomProvider>
    )
  })

  it('Should render login page', () => {
    cy.get('div').should('exist');
    cy.get('body').should('contain.html')
  })

  it("Should successfully render initial app state", () => {
    cy.get('#center-flex')
      .should('exist')
      .should('contain.text', 'Meeting Id')
      .should('contain.text', 'Name');

    cy.get('.form-container')
      .should('exist')
      .should('contain.html', 'form')
    
    cy.get('[data-testid="button"]')
      .should('exist')
      .click()
  })

  it('begins meeting', () => {
    cy.get(':nth-child(1) > [data-testid="input-wrapper"] > [data-testid="input"]')
      .click()
      .type('000000000000000000--0')
    cy.get(':nth-child(2) > [data-testid="input-wrapper"] > [data-testid="input"]')
      .click()
      .type('00')
    cy.get('[data-testid="button"]')
      .click()
  })

});