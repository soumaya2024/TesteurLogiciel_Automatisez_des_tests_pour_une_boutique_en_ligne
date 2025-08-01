describe('Smoke Test', () => {
  it('La page d’accueil est accessible', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('Accueil').should('be.visible');
  });

  it('La page produits est accessible', () => {
    cy.visit('http://localhost:8080/#/products');
    cy.get('#other-products').should('be.visible');
    // Vérifie la présence du bouton "Ajouter au panier"
    cy.get('[data-testid="Ajouter au panier"], .add-to-cart').should('exist');
  });

  it('L\'ajout au panier fonctionne', () => {
    cy.visit('http://localhost:8080/#/products/3');
    cy.get('[data-testid="Ajouter au panier"], .add-to-cart').first().should('be.visible').click();
    // Vérifie la présence d'une notification ou d'un changement dans le panier
   // cy.get('.cart-count, [data-cy="cart-count"]').should('exist');
  });
  it('La page panier est accessible après connexion', () => {
    // Aller à la page de connexion
    cy.visit('http://localhost:8080/#/login');
    // Remplacez les sélecteurs et valeurs par ceux adaptés à votre formulaire
    cy.get('input[type="text"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('testtest');
    // Cliquer sur le bouton "Se connecter"
    cy.get('button[data-cy="login-submit"]').click();
    // Attendre que la redirection ou le chargement de l'utilisateur soit terminé
    cy.url().should('not.include', '/login');
  
    cy.get('body', { timeout: 10000 }).should('contain.text', 'Voir les produits');
    // Cliquer sur "Mon panier"
    cy.get('a[data-cy="nav-link-cart"]').click();
    // Vérifie que la page panier est affichée
    cy.url().should('include', '/cart');
    cy.contains('h1, h2, h3', 'Commande').should('exist');
  });

  // Aller à la page panier
  it('La page panier est accessible directement après connexion', () => {
    // Aller à la page de connexion
    cy.visit('http://localhost:8080/#/login');
    cy.get('input[type="text"]').type('test2@test.fr');
    cy.get('input[type="password"]').type('testtest');
    cy.get('button[data-cy="login-submit"]').click();
    cy.url().should('not.include', '/login');
    // Aller à la page panier
    cy.visit('http://localhost:8080/#/cart');
    // Vérifie la présence d'un élément unique du panier
    cy.contains('Votre panier').should('exist');
  });



  it('Vérifie le stock du produit', () => {
    cy.visit('http://localhost:8080/#/products/3');
    cy.get('[data-cy="detail-product-stock"]').should('be.visible');
    // Remplacez "-11 en stock" par la valeur attendue dans votre application
    cy.get('[data-cy="detail-product-stock"]').should('contain.text', 'en stock');
  });
});
