
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    env: {
      apiUrl: "http://localhost:8081"
    },
    setupNodeEvents(on, config) {
      // Tu peux ajouter ici des événements Node si nécessaire
    }
  }
});




