const strings = require('../../../fixtures/strings');

describe(strings.api_get_products_context, () => {



const apiUrl = Cypress.env("apiUrl");
console.log('apiUrl:', apiUrl); // Affiche la valeur de apiUrl

const apiProduct = `${apiUrl}/products`;
console.log('apiProduct:', apiProduct); // Affiche la valeur de apiProduct
context(strings.api_get_products_context, () => {
  it(strings.api_get_products_it, () => {
    cy.request("GET", apiProduct).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).length.to.be.greaterThan(5)
    })
  })
})
describe(strings.api_security_describe, () => {
  it(strings.api_security_it, () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
describe(strings.api_product_detail_describe, () => {
  it(strings.api_product_detail_it, () => {
    cy.request(apiProduct).then((listResponse) => {
      expect(listResponse.status).to.eq(200);
      expect(listResponse.body).to.be.an('array').and.to.have.length.greaterThan(0);
      const firstProduct = listResponse.body[0]; // On prend le premier produit
      const productId = firstProduct.id;

      cy.request(`${apiProduct}/${productId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", productId);
        expect(response.body).to.have.property("name");
      });
    });
  });
});
const apiLogin = `${apiUrl}/login`; // adapte selon le vrai endpoint

describe(strings.api_login_describe, () => {
  it(strings.api_login_it, () => {
    cy.request({
      method: 'POST',
      url: apiLogin,
      body: {
        username: strings.api_login_username,
        password: strings.api_login_password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });
});

describe(strings.api_add_review_describe, () => {
  it(strings.api_add_review_it, () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: strings.api_login_username,
        password: strings.api_login_password
      }
    }).then((loginResponse) => {
      const token = loginResponse.body.token;

      cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/products`
      }).then((productResponse) => {
        const productId = productResponse.body[0].id;

        cy.request({
          method: "POST",
          url: `${Cypress.env("apiUrl")}/reviews`,
        
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            title: strings.api_review_title,
            rating: 5,
            comment: strings.api_review_comment
          }
        }).then((reviewResponse) => {
          expect(reviewResponse.status).to.eq(200);
        });
      });
    });
  });
});
describe("Ajout d’un produit au panier", () => {
  it("devrait ajouter un produit disponible au panier", () => {
    cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
      username: strings.api_login_username,
      password: strings.api_login_password
    }).then((loginResponse) => {
      const token = loginResponse.body.token;
      expect(token, 'Token should be present in login response').to.exist;

      cy.request("GET", `${Cypress.env("apiUrl")}/products`).then((productResponse) => {
        // Vérifie que la réponse contient bien un tableau de produits
        expect(productResponse.body, 'Product response body should be an array').to.be.an('array').and.to.have.length.greaterThan(0);
        // Cherche un produit disponible en stock
        const availableProduct = productResponse.body.find(p => p && typeof p.stock === 'number' && p.stock > 0);
        if (!availableProduct) {
          throw new Error('There should be at least one product in stock, but none was found. Please check your test data.');
        }
        const productId = availableProduct.id;

        cy.request({
          method: "POST",
          url: `${Cypress.env("apiUrl")}/orders/add`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            productId: productId,
            quantity: 1
          }
        }).then((orderResponse) => {
          expect(orderResponse.status).to.eq(200);
        });
      });
    });
  });
});

});