/* eslint-disable no-undef */
/// <reference types="cypress">
const APP_URL = process.env.APP_URL || 'http://localhost:8080'
const API_URL = 'https://reqres.in/api'

describe('Login', () => {
  it.skip('should open and close login modal', () => {
    cy.visit(APP_URL)
    cy.get('.flex > .bg-brand-navyblue').click()
    cy.get('.overflow-hidden > .flex-col').should('be.visible')
    cy.get('.flex-col > .flex > .text-4xl').click()
    cy.get('.overflow-hidden > .flex-col').should('not.exist')
  })

  it.skip('should open login modal and perform login', () => {
    cy.visit(APP_URL)

    cy.get('.flex > .bg-brand-navyblue').click()
    cy.get(':nth-child(1) > .custom-input').type('eve.holt@reqres.in')
    cy.get('.mt-4 > .custom-input').type('cityslicka')

    cy.intercept('POST', '**/login').as('login')
    cy.get('form > .mt-10').click()

    // cy.wait('@login').its('response.statusCode').should('eq', 200)
    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
    })

    cy.url().should('include', '/discovery')
  })

  it.skip('should save token at localStorage', () => {
    cy.visit(APP_URL)

    cy.get('.flex > .bg-brand-navyblue').click()
    cy.get(':nth-child(1) > .custom-input').type('eve.holt@reqres.in')
    cy.get('.mt-4 > .custom-input').type('cityslicka')

    cy.intercept('POST', '**/login').as('login')
    cy.get('form > .mt-10').click()

    // cy.wait('@login').its('response.statusCode').should('eq', 200)
    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      Cypress.env('token', response.body.token)
    })

    cy.visit(`${APP_URL}`, {
      onBeforeLoad: (browser) => {
        expect(browser.localStorage.getItem('token')).to.eq(Cypress.env('token'))
      }
    })
  })

  it.skip('should try to login without fill the input fields', () => {
    cy.visit(APP_URL)

    cy.get('.flex > .bg-brand-navyblue').click()

    cy.get('form > .mt-10').click()
    cy.get('.Vue-Toastification__toast').contains('Verifique seus dados e tente novamente')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  })

  it.skip('should try to login with invalid credentials', () => {
    cy.visit(APP_URL)

    cy.get('.flex > .bg-brand-navyblue').click()
    cy.get(':nth-child(1) > .custom-input').type('eve.holt@reqres.com')
    cy.get('.mt-4 > .custom-input').type('teste123')

    cy.intercept('POST', '**/login').as('login')
    cy.get('form > .mt-10').click()
    cy.get('.Vue-Toastification__toast').contains('Cadastro não encontrado')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  })
})
