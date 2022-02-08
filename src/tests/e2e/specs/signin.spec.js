/* eslint-disable no-undef */
/// <reference types="cypress">

describe('Header sign in', () => {
  it('should open and close sign in modal', () => {
    cy.get('[data-cy=header-signin]').click()
    cy.get('[data-cy=modal-signin]').should('be.visible')
    cy.get('[data-cy=modal-signin-close]').click()
    cy.get('[data-cy=modal-signin]').should('not.exist')
  })

  it('should create a new user', () => {
    cy.get('[data-cy=header-signin]').click()
    cy.get('[data-cy=modal-signin-name]').type(Cypress.env('signinRequest').first_name)
    cy.get('[data-cy=modal-signin-surname]').type(Cypress.env('signinRequest').last_name)
    cy.get('[data-cy=modal-signin-email]').type(Cypress.env('signinRequest').email)
    cy.get('[data-cy=modal-signin-password]').type(Cypress.env('signinRequest').password)
    cy.intercept('POST', '**/register', { body: Cypress.env('signinResponse') }).as('newUser')
    cy.get('[data-cy=modal-signin-submit]').click()

    cy.wait('@newUser').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      expect(response.body).to.deep.equal({
        token: Cypress.env('signinResponse').token,
        id: Cypress.env('signinResponse').id
      })
    })
  })
})

describe('Container sign in', () => {
  it('should open and close sign in modal', () => {
    cy.get('[data-cy=body-signin]').click()
    cy.get('[data-cy=modal-signin]').should('be.visible')
  })
})

describe('Sign in fail cases', () => {
  beforeEach(() => {
    cy.get('[data-cy=body-signin]').click()
  })

  it('should show an error message when user name and last name length is les than 3 characters', () => {
    cy.get('[data-cy=modal-signin-name]').type('Jo')
    cy.get('[data-cy=modal-signin-surname]').type('Do')

    cy.get('[data-cy=modal-signin-name-error]').should('have.text', '*No mínimo 3 caracteres')
    cy.get('[data-cy=modal-signin-surname-error]').should('have.text', '*No mínimo 3 caracteres')
  })

  it('should show an error message when email is not valid', () => {
    cy.get('[data-cy=modal-signin-email]').type('john.doe@')

    cy.get('[data-cy=modal-signin-email-error]').should('have.text', '*Este campo precisa ser um e-mail')
  })

  it('should show an error message when password is invalid', () => {
    cy.get('[data-cy=modal-signin-password]').type('123')

    cy.get('[data-cy=modal-signin-password-error]').should('exist')
  })
})
