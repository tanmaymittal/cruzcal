describe('cruzcal: SubjectDropDown component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=subjectdropdown--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SubjectDropDown!');
    });
});
