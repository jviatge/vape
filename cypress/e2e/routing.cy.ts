const fs = require("fs");
const path = require("path");
/* import createReservationsAdminScenario from "../../../test/createReservationsAdmin.scenario"; */

const baseDir = path.basename("../../");
const excludes = ["index.ts", "DS_Store"];

const fileName = (str: string) => {
    return str.split(".").slice(0, -1).join(".");
};

beforeEach(() => {
    cy.login("julien.viatge@gmail.com", "password");
});

it("Dashboard", () => {
    cy.visit("/dashboard");
});

it("Ressources", async () => {
    cy.fsReadDir(path.join(baseDir, "resources")).then((files) => {
        files.map(async (file) => {
            if (excludes.includes(file)) return;
            cy.log("visit -> /" + file.split(".")[0]);
            cy.visit("/" + file.split(".")[0]);
        });
    });
});

/* it("Scenarios", async () => {
    cy.fsReadDir(path.join(baseDir, "test")).then((files) => {
        files.map(async (file) => {
            const pathScenario = "../../../test/createReservationsAdmin";
            import(pathScenario + ".scenario").then((a) => {
                cy.log("file ----->", a);
            });
        });
    });
}); */

/* it("Page /request-contacts", () => {
    cy.visit("/request-contacts");
    // Header show
    cy.get(".flex-col > .flex > .relative").contains("Demande de contacts");
    // Table show
    cy.get(".container-page > .overflow-hidden").should("be.visible");
});

it("Page /estimates", () => {
    cy.visit("/estimates");
    // Header show
    cy.get(".flex-col > .flex > .relative").contains("Devis");
    // Table show
    cy.get(".container-page > .overflow-hidden").should("be.visible");
}); */
