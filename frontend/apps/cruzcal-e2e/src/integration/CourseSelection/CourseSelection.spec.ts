describe('cruzcal: CourseSelection component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=courseselection--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CourseSelection!');
    });
});
