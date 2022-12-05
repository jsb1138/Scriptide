import { mount } from "cypress/react18";
import { IDE } from "../../src/components/IDE/IDE";
import ScriptideProvider from "../../src/contexts/ScriptideProvider";
import { RoomProvider } from "../../src/liveblocks.config";

describe("IDE", () => {
  beforeEach(() => {
    mount(
      <RoomProvider id="12678900345">
        <ScriptideProvider>
          <IDE />
        </ScriptideProvider>
      </RoomProvider>
    );
  });

  it("renders", () => {
    cy.get('[data-cy-root=""]')
      .should('exist');
  });

  it('IDE displays', () => {
    cy.get('.view-lines.monaco-mouse-cursor-text').not('.ide-output')
      .should('exist')
  })

  it('output details display', () => {
    cy.get('.ide-run-btn')
      .should('exist')
    cy.get('.ide-output')
      .should('exist')
      .should('contain.text', 'Output')
  })
});
