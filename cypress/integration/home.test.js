
describe('Home Page', () => {

  beforeEach(()=> {
    
    cy.fixture('courses.json').as("coursesJSON");
    cy.server();
    cy.route('/api/courses', '@coursesJSON').as('courses');
    cy.visit('/');
  })

  it('should display a list of courses', () => {

    cy.contains("All Courses");

    cy.wait('@courses');
    // mock backend response so don't need to run own backend server for that

    // using real http request, but mocking the response of the requests
    // mock data in fixtures folder, as json.

    cy.get('mat-card').should('have.length', 9);
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should("have.length", 2);
    cy.get('.mat-tab-label').last().click();
    // Cypress takes care of the animation asynchronous aspect of the test for us.
    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);
    cy.get('.mat-tab-body-active .mat-card-title').first()
      .should('contain', 'Angular Security Course');
  })

})