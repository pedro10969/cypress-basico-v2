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

Cypress.Commands.add('telaLoginSAV', function() {
  cy.visit('https://tjdkt01.tj.ce.gov.br:8200/login')

  cy.get('#auth_username')
    .type('75693151115')

  cy.get('#auth_password')
    .type('P@ssw0rd####')

  cy.get('.btn')
    .click()

  cy.get('.m-0')
    .should('be.visible', 'inicio')
})

