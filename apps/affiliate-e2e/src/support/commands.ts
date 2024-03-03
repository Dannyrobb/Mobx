// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(userName: string, password: string): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (userName, password) => {
  console.log('Custom command example: Login', userName, password);
  cy.get('form').should('exist');
  cy.get('input').should('have.length', 2);
  cy.get('label').contains('User name').should('exist').siblings('div').find('input').clear().type(userName);
  cy.get('label').contains('Password').should('exist').siblings('div').find('input').clear().type(password);
  cy.get('button').contains('Login').click();
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
