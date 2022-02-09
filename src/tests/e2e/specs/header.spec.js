/* eslint-disable no-undef */
/// <reference types="cypress">
import Discovery from '../support/pages/Discovery'

describe('Header', () => {
  it('should logout', () => {
    cy.login()
    Discovery.logout()
  })

  it('should navigate to user profile page', () => {
    cy.login()
    Discovery.navToProfile()
  })

  it('should navigate to find places page', () => {
    cy.login()
    Discovery.navToDiscovery()
  })
})
