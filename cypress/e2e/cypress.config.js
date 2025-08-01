const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080", // ou ton URL réelle
    env: {
      apiUrl: "http://localhost:8081", // adapte selon ton backend
      login_url: "/login",
      admin_url: "/admin",
      user_url: "/user"
    },
    setupNodeEvents(on, config) {
      // Tu peux ajouter des événements ici si besoin
      return config;
    }
  },
  video: false,
  screenshotOnRunFailure: false,
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/junit-results.xml",
    toConsole: true
  }
});
