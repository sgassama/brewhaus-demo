describe('App', () => {
  context('Home page', () => {
    it('should load the home page', () => {
      cy.visit('/')

      cy.getBySel('app-header')
    });
  })
})
