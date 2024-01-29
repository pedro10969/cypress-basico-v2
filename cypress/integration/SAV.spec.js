/// <reference types="Cypress" />

describe('Acessar a página de login e validar entrada', function() {

    beforeEach(() => {
        cy.telaLoginSAV()
      })

    it.only('Acessar tela de agendamentos', function() {
        cy.get('[data-turbolinks="false"] > .nav-link')
          .click()

        cy.get('.col > .btn-primary')
          .click()

        cy.get('.btn-success')
          .click()

        cy.get('(//option[contains(@value,"2")])[1]')
          .click()
          .select('60')
          })
        
    })


