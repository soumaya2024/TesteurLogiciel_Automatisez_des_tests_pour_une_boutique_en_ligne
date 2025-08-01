describe('Mock API - Produits', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Produit mock 1', stock: 10 },
        { id: 2, name: 'Produit mock 2', stock: 0 }
      ]
    }).as('getProducts');
  });

  it('affiche les produits mockés', () => {
    cy.visit('http://localhost:8080/#/products');
    cy.wait('@getProducts');
    cy.contains('Produit mock 1').should('be.visible');
    cy.contains('Produit mock 2').should('be.visible');
  });
});
