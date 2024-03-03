describe('customer profile page', () => {
  beforeEach(() => cy.visit('/'));

  it('should be able to login', () => {
    cy.intercept({ method: 'POST', url: '/authenticate/login-as-affiliate' }, { fixture: 'login/successful.json' }).as(
      'login'
    );
    cy.intercept(
      { method: 'GET', url: '/', query: { command: 'getUIConfigJSON' } },
      { fixture: 'login/successful.json' }
    )
      .as('getUIConfigJSON')
      .debug();
    cy.login('markmarkmark', 'arst');

    cy.get('div').contains('Account Details').click();
  });
});
