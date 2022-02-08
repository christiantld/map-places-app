/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const APP_URL = process.env.APP_URL || 'http://localhost:8080'
const API_URL = 'https://reqres.in/api'

Cypress.Commands.add('getToken', () => {
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
})

Cypress.Commands.add('getUserData', () => {
  cy.request({
    method: 'GET',
    url: `${API_URL}/users/2`,
    headers: { Authorization: `Bearer ${Cypress.env('token')}` }
  }).then((response) => {
    expect(response.body).has.property('data')
    Cypress.env('currentUser', response.body.data)
  })
})

Cypress.Commands.add('login', () => {
  cy.getToken()
  cy.getUserData()

  cy.visit(`${APP_URL}/discovery`, {
    onBeforeLoad: (browser) => {
      browser.localStorage.setItem('token', Cypress.env('token'))
      browser.localStorage.setItem('currentUser', Cypress.env('currentUser'))
    }
  })
})
