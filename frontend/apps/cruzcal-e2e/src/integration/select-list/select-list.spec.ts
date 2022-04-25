describe('cruzcal: SelectList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectlist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SelectList!');
    });
});
