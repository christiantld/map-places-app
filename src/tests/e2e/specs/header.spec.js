/* eslint-disable no-undef */
/// <reference types="cypress">
const APP_URL = process.env.APP_URL || 'http://localhost:8080'
const API_URL = 'https://reqres.in/api'

describe('Header', () => {
  it.skip('should logout', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((response) => {
      expect(response.body).has.property('token')
      Cypress.env('token', response.body.token)
    })

    cy.request({
      method: 'GET',
      url: `${API_URL}/users/2`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
    }).then((response) => {
      expect(response.body).has.property('data')
      Cypress.env('currentUser', response.body.data)
    })

    cy.visit(`${APP_URL}/discovery`, {
      onBeforeLoad: (browser) => {
        browser.localStorage.setItem('token', Cypress.env('token'))
        browser.localStorage.setItem('currentUser', Cypress.env('currentUser'))
      }
    })

    cy.get('.bg-white').click()

    expect(localStorage.getItem('token')).to.eq(null)
    expect(localStorage.getItem('currentUser')).to.eq(null)
  })

  it('should navigate to user profile page', () => {
    cy.visit(APP_URL)

    cy.get('.flex > .bg-brand-navyblue').click()
    cy.get(':nth-child(1) > .custom-input').type('eve.holt@reqres.in')
    cy.get('.mt-4 > .custom-input').type('cityslicka')

    cy.intercept('POST', '**/login').as('login')
    cy.get('form > .mt-10').click()
    cy.get('.items-center > div.flex > .flex > :nth-child(2)').click()

    cy.url().should('include', '/profile')
  })

  it.skip('should navigate to find places page', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((response) => {
      expect(response.body).has.property('token')
      Cypress.env('token', response.body.token)
    })

    cy.request({
      method: 'GET',
      url: `${API_URL}/users/2`,
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
    }).then((response) => {
      expect(response.body).has.property('data')
      Cypress.env('currentUser', response.body.data)
    })

    cy.visit(`${APP_URL}/profile`, {
      onBeforeLoad: (browser) => {
        browser.localStorage.setItem('token', Cypress.env('token'))
        browser.localStorage.setItem('currentUser', Cypress.env('currentUser'))
      }
    })

    cy.get('.items-center > div.flex > .flex > :nth-child(1)').click()

    cy.url().should('include', '/discovery')
  })
})
