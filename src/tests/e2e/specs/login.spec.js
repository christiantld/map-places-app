/* eslint-disable no-undef */
/// <reference types="cypress">

describe('Login', () => {
  const loginReq = Cypress.env('loginRequest')
  // const loginRes = Cypress.env('loginResponse')

  it('should open and close login modal', () => {
    cy.get('[data-cy=header-login]').click()
    cy.get('[data-cy=modal-login]').should('be.visible')
    cy.get('[data-cy=close-modal-login]').click()
    cy.get('[data-cy=modal-login]').should('not.exist')
  })

  it('should open login modal and perform login', () => {
    cy.get('[data-cy=header-login]').click()
    cy.get('[data-cy=login-email-input]').type(loginReq.email)
    cy.get('[data-cy=login-password-input]').type(Cypress.env('loginRequest').password)

    cy.intercept('POST', '**/login').as('login')
    cy.get('[data-cy=submit-login]').click()

    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
    })

    cy.url().should('include', '/discovery')
  })

  it('should save token at localStorage', () => {
    cy.get('[data-cy=header-login]').click()
    cy.get('[data-cy=login-email-input]').type(loginReq.email)
    cy.get('[data-cy=login-password-input]').type(Cypress.env('loginRequest').password)

    cy.intercept('POST', '**/login', { body: Cypress.env('loginResponse') }).as('login')
    cy.get('[data-cy=submit-login]').click()

    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      Cypress.env('token', response.body.token)
    })

    cy.visit(`${'/'}`, {
      onBeforeLoad: (browser) => {
        expect(browser.localStorage.getItem('token')).to.eq(Cypress.env('token'))
      }
    })
  })

  it('should try to login without fill the input fields', () => {
    cy.get('[data-cy=header-login]').click()

    cy.get('[data-cy=submit-login]').click()

    cy.get('.Vue-Toastification__toast').contains('Verifique seus dados e tente novamente')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  })

  it('should try to login with invalid credentials', () => {
    cy.get('[data-cy=header-login]').click()
    cy.get(':nth-child(1) > .custom-input').type('eve.holt@reqres.com')
    cy.get('.mt-4 > .custom-input').type('teste123')

    cy.intercept('POST', '**/login', { statusCode: 404 }).as('login')
    cy.get('[data-cy=submit-login]').click()

    cy.get('.Vue-Toastification__toast').contains('Cadastro não encontrado')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  })
})
