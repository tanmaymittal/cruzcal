describe('cruzcal: CourseSelectionList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=courseselectionlist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CourseSelectionList!');
    });
});
