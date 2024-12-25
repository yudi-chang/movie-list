describe('Movie List E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should display a list of movies from the API', () => {
    cy.get('.movie-card').should('have.length', 10);
  });

  it('should display movie details including title, year, and IMDB ID', () => {
    cy.get('.movie-card').first().within(() => {
      cy.get('.movie-info h2').should('exist');
      cy.get('.additional-info .imdb-info').should('exist');
      cy.get('.additional-info .year-info').should('exist');
    });
  });

  it('should paginate the movie list', () => {
    cy.get('.v-pagination__item').eq(1).click();
    cy.get('.v-pagination__item')
      .eq(1)
      .should('have.class', 'v-pagination__item--is-active');
  });

  it('should allow the user to search for movies by title', () => {
    cy.get('.search-bar-wrapper input').type('Harry Potter');
    cy.wait(500);
    cy.get('.movie-card').each(($movie) => {
      cy.wrap($movie).contains('Harry Potter');
    });
  });

  it('should allow the user to star/unstar a movie', () => {
    cy.get('.movie-card').first().within(() => {
      cy.get('.star-btn').click(); 
      cy.get('.star-btn').should('have.class', 'favorited');
    });

    cy.get('.movie-card').first().within(() => {
      cy.get('.star-btn').click(); 
      cy.get('.star-btn').should('not.have.class', 'favorited');
    });

    cy.get('[data-test="counter-wrapper"]').should('have.text', '0');
  });

  it('should keep starred movies in favorites', () => {
    cy.get('.movie-card').first().within(() => {
      cy.get('.star-btn').click();
    });
    cy.get('nav ul li').eq(1).click();
    cy.get('.movie-card').should('have.length', 1);
  });
});
