describe('cruzcal: SubjectFilter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=subjectfilter--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SubjectFilter!');
    });
});
