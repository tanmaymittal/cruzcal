describe('cruzcal: CalendarView component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=calendarview--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CalendarView!');
    });
});
