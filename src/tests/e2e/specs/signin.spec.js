/* eslint-disable no-undef */
/// <reference types="cypress">
const APP_URL = process.env.APP_URL || 'http://localhost:8080'
const API_URL = 'https://reqres.in/api'

describe('Header sign in', () => {
  it.skip('should open and close sign in modal', () => {
    cy.visit(APP_URL)
    cy.get('.items-center > .flex > .text-brand-darkinfo').click()
    cy.get('.overflow-hidden > .flex-col').should('be.visible')
    cy.get('.flex-col > .flex > .text-4xl').click()
    cy.get('.overflow-hidden > .flex-col').should('not.exist')
  })

  it.skip('should create a new user', () => {
    cy.visit(APP_URL)
    cy.get('.items-center > .flex > .text-brand-darkinfo').click()
    cy.get(':nth-child(1) > .custom-input').type('John')
    cy.get(':nth-child(2) > .custom-input').type('Doe')
    cy.get(':nth-child(3) > .custom-input').type('eve.holt@reqres.in')
    cy.get(':nth-child(4) > .custom-input').type('pistol')
    cy.intercept('POST', '**/register').as('newUser')
    cy.get('form > .mt-10').click()

    cy.wait('@newUser').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      expect(response.body).has.property('id')
    })
  })
})

describe('Container sign in', () => {
  it.skip('should open and close sign in modal', () => {
    cy.visit(APP_URL)
    cy.get('.mt-10').click()
    cy.get('.overflow-hidden > .flex-col').should('be.visible')
    cy.get('.flex-col > .flex > .text-4xl').click()
    cy.get('.overflow-hidden > .flex-col').should('not.exist')
  })
})

describe('Sign in fail cases', () => {
  it.skip('should show an error message when user name and last name length is les than 3 characters', () => {
    cy.visit(APP_URL)
    cy.get('.mt-10').click()
    cy.get(':nth-child(1) > .custom-input').type('Jo')
    cy.get(':nth-child(2) > .custom-input').type('Do')

    cy.get('form > :nth-child(1) > .block').should('have.text', '*No mínimo 3 caracteres')
    cy.get('form > :nth-child(2) > .block').should('have.text', '*No mínimo 3 caracteres')
  })

  it.skip('should show an error message when email is not valid', () => {
    cy.visit(APP_URL)
    cy.get('.mt-10').click()
    cy.get(':nth-child(3) > .custom-input').type('john.doe@')

    cy.get('form > :nth-child(3) > .block').should('have.text', '*Este campo precisa ser um e-mail')
  })

  it.skip('should show an error message when password is invalid', () => {
    cy.visit(APP_URL)
    cy.get('.mt-10').click()
    cy.get(':nth-child(4) > .custom-input').type('123')

    cy.get('form > :nth-child(4) > .block').should('exist')
  })
})
