describe('cruzcal: WarningDialog component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=warningdialog--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to WarningDialog!');
    });
});
