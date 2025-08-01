import { faker } from '@faker-js/faker';

describe('Test de la page produits', () => {
  it('Ajoute un produit avec des données aléatoires', () => {
    const nomProduit = faker.commerce.productName();
    const prix = faker.commerce.price();
    const description = faker.commerce.productDescription();

    cy.visit(`${Cypress.env('baseUrl')}/#/products`);

    // Exemple d'interactions — à adapter selon votre interface
    
    cy.get('#product', { timeout: 10000 }).should('be.visible');

    cy.get('#ajouter-produit').click();
    cy.get('#nom').type(nomProduit);
    cy.get('#prix').type(prix);
    cy.get('#description').type(description);
    cy.get('form').submit();

    // Vérification que le produit a été ajouté
    cy.contains(nomProduit).should('be.visible');
  });
});
