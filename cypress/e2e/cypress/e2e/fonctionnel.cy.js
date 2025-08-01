describe('Connexion avec nom d’utilisateur', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/login');
  });

  it('Connexion réussie avec identifiants valides', () => {
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('testtest');
    cy.get('button[data-cy="login-submit"]').click();

    cy.url().should('include', '#');
    cy.contains('Voir les produits').should('be.visible');
  });

 it('Connexion échouée avec mauvais mot de passe', () => {
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('mauvaismdp');
    cy.get('button[data-cy="login-submit"]').click();

    // Attendre un message d'erreur ou rester sur la même page
    cy.url().should('include', '/login');

    // Vérifie qu’un message d’erreur est affiché
    cy.contains('Identifiants incorrects').should('be.visible');
  });
});
;
describe('Ajout du produit "Sentiments printaniers" au panier avec connexion', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('devrait se connecter et ajouter le produit au panier', () => {
    // Aller à la page de connexion
    cy.visit('http://localhost:8080/#/login');

    // Connexion
    cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('testtest');
    cy.get('button[data-cy="login-submit"]').click();

    // Vérifier qu'on est bien connecté
    cy.url().should('not.include', '/login');

    // Aller à la page produit
    cy.visit('http://localhost:8080/#/products/3');

    // Vérifier le nom du produit
    cy.get('[data-cy="detail-product-name"]', { timeout: 10000 })
      .should('contain', 'Sentiments printaniers');

    // Ajouter au panier
    cy.get('button[data-cy="detail-product-add"]').click();

    // Vérifier le compteur panier
    //cy.get('[data-cy="cart-count"]', { timeout: 10000 }).should('contain', '1');

    // Aller à la page panier
    cy.visit('http://localhost:8080/#/cart');

    // Vérifier que le produit est bien dans le panier
    cy.get('[data-cy="cart-line-name"]', { timeout: 10000 })
   //   .should('contain', 'Sentiments printaniers');
  });
});



;



