describe('login page', () => {
  beforeEach(() => cy.visit('/'));

  it('should be able to login', () => {
    cy.intercept({ method: 'POST', url: '/authenticate/login-as-affiliate' }, { fixture: 'login/successful.json' }).as(
      'login'
    );
    cy.login('markmarkmark', 'arst');
  });
  //   it('should present error message when login fails', () => {
  //     cy.intercept({ method: 'POST', url: '/authenticate/login-as-affiliate' }, { fixture: 'login/wrong-email.json' }).as(
  //       'login'
  //     );
  //     cy.login('markmarkmark', 'arst');
  //     cy.get('div.alert.alert-danger').contains('Invalid username or password');
  //   });
});
