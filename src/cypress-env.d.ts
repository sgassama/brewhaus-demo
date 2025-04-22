/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string): Chainable<JQuery<HtmlElement>>;
  }
}
