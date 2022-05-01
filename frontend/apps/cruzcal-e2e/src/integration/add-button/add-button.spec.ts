describe('cruzcal: AddButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=addbutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AddButton!');
    });
});
