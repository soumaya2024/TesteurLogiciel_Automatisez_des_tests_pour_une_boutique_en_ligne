describe('Mon application', () => {
    it('devrait afficher "Hello World"', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Hello World').should('be.visible');
    });
});