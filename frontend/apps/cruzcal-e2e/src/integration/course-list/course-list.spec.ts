describe('cruzcal: CourseList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=courselist--primary&args=courses;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CourseList!');
    });
});
