Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName')
    .type('Pedro')
    .should('have.value', 'Pedro')

  cy.get('#lastName')
    .type('Henrique')
    .should('have.value', 'Henrique')

  cy.get('#email')
    .type('pedro_aser@hotmail.com')
    .should('have.value', 'pedro_aser@hotmail.com')

  cy.get('#open-text-area')
    .type('Teste')
    .should('have.value', 'Teste')

  cy.get('button[type="submit"]')
    .click()
})
