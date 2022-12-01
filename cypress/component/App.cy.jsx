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

  it("Should successfully render porthole components", () => {
    cy.get('#grid-view-closed').should('exist');
    cy.get('#ide-view-closed').should('exist');
    cy.get('#cam-view-open').should('exist');
  })

  it("Should open the IDE porthole on click", () => {
    cy.get('#ide-view-closed').click().then(() => {
      cy.get('#ide-view-open').should('exist');
    })
  })

  it("Should open the IDE porthole on click", () => {
    cy.get('#grid-view-closed').click().then(() => {
      cy.get('#grid-view-open').should('exist');
    })
  })

  it("Should open the IDE porthole on click", () => {
    cy.get('#cam-view-open').click().then(() => {
      cy.get('#cam-view-closed').should('exist');
    })
  })
});