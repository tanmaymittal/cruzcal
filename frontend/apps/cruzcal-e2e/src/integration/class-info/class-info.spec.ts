describe('cruzcal: ClassInfo component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=classinfo--primary&args=className;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ClassInfo!');
    });
});
