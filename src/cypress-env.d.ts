/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string): Chainable<JQuery<HtmlElement>>;
  }
}
