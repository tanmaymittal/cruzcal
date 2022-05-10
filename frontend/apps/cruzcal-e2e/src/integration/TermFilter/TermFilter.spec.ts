describe('cruzcal: TermFilter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=termfilter--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TermFilter!');
    });
});
