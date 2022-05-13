describe('cruzcal: CourseFilter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=coursefilter--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CourseFilter!');
    });
});
