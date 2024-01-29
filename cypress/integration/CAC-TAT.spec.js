/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('1 - Preencher os campos obrigatórios e envia o formulário', function () {
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

    cy.get('.success')
      .should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('2 - E-mail com formatação inválida', function () {
    cy.get('#firstName')
      .type('Pedro')
      .should('have.value', 'Pedro')

    cy.get('#lastName')
      .type('Henrique')
      .should('have.value', 'Henrique')

    cy.get('#email')
      .type('pedro_aser')
      .should('have.value', 'pedro_aser')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')
  })


  it('3 - Validar telefone', function () {
    cy.get('#firstName')
      .type('Pedro')
      .should('have.value', 'Pedro')

    cy.get('#lastName')
      .type('Henrique')
      .should('have.value', 'Henrique')

    cy.get('#email')
      .type('pedro_aser@hotmail.com')
      .should('have.value', 'pedro_aser@hotmail.com')

    cy.get('#phone')
      .type('abc')
      .should('have.value', '')

    cy.get('button[type="submit"]')
      .click()
  })

  it('4 - Telefone obrigatório', function () {
    cy.get('#firstName')
      .type('Pedro')
      .should('have.value', 'Pedro')

    cy.get('#lastName')
      .type('Henrique')
      .should('have.value', 'Henrique')

    cy.get('#email')
      .type('pedro_aser@hotmail.com')
      .should('have.value', 'pedro_aser@hotmail.com')

    cy.get('#phone-checkbox')
      .click()
      .should('be.checked')

    cy.get('#open-text-area')
      .type('Teste')
      .should('have.value', 'Teste')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')
  })

  it('5 - Preenche e limpa campo', function () {
    cy.get('#firstName')
      .type('Pedro')
      .should('have.value', 'Pedro')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Henrique')
      .should('have.value', 'Henrique')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('pedro_aser@hotmail.com')
      .should('have.value', 'pedro_aser@hotmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('Teste')
      .should('have.value', 'Teste')

    cy.contains('button', 'Enviar')
      .click()
  })

  it('6 - Campos obrigatórios vazios', function () {
    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')
  })

  it('7 - seleciona um produto (YouTube) por seu texto', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  })

  it('8 - seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('9 - seleciona um produto (Blog) por seu índice', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('10 - marca o tipo de atendimento "Feedback"', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get(':nth-child(4) > input')
      .check()
  })

  it('11 - marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('12 - marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('13 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
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

    cy.get('#phone-checkbox')
      .check()

    cy.get('button[type="submit"]')
      .click()
  })

  it('14 - seleciona um arquivo da pasta fixtures', function () {
    cy.get('#file-upload')
      .selectFile('./Certificado.png')
  })

  it.only('15 - seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./Certificado.png', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('Certificado.png')
      })
  })

  it('16 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('17 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique ', function () {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      })

  it('18 - acessa a página da política de privacidade removendo o target e então clicando no link ', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      
    cy.contains('Talking About Testing')
      .should('be.visible')
      })
  
  it('20 - testa a página da política de privacidade de forma independente ', function () {
    cy.get('#privacy a')
      .click()
    })
  })
