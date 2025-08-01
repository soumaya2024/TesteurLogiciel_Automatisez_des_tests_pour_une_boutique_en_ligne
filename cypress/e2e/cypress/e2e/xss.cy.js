describe('Test XSS dans l’espace commentaire', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:8080/#/login');
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('testtest');
    cy.get('button[data-cy="login-submit"]').click();
    cy.url().should('not.include', '/login');
  });

  it('devrait vérifier qu’un script XSS est échappé dans les commentaires', () => {
    // Aller à la page des avis
    cy.visit('http://localhost:8080/#/reviews');

    // Payload XSS
    const xssPayload = `<img src=x onerror=alert('XSS') />`;

    // Saisir le commentaire
    cy.get('[data-cy="review-input-comment"]', { timeout: 10000 })
      .should('exist')
      .and('be.visible')
      .type(xssPayload);

    // Soumettre le commentaire
    cy.get('[data-cy="review-submit"]').click();

    // Vérifier qu'aucune alerte n'est déclenchée
    cy.on('window:alert', () => {
      throw new Error('XSS détecté : le script a été exécuté');
    });

    // Vérifier que le contenu n'est pas affiché comme HTML et que le payload XSS n'est pas présent
    cy.get('[data-cy="review-detail"]').should('not.contain.text', xssPayload);
  });
});
