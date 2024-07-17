import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            /*on: Cypress.PluginEvents, config:Cypress.PluginConfigOptions*/
            // implement node event listeners here
            return require("./node_modules/cypress-fs/plugins/index.js")(on, config);
        },
    },
});
