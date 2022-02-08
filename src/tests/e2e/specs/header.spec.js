/* eslint-disable no-undef */
/// <reference types="cypress">

describe('Header', () => {
  it('should logout', () => {
    cy.login()
    cy.get('[data-cy=logout]').click()

    expect(localStorage.getItem('token')).to.eq(null)
    expect(localStorage.getItem('currentUser')).to.eq(null)
  })

  it('should navigate to user profile page', () => {
    cy.login()

    cy.get('[data-cy=nav-profile]').click()

    cy.url().should('include', '/profile')
  })

  it('should navigate to find places page', () => {
    cy.login()

    cy.get('[data-cy=nav-discovery]').click()

    cy.url().should('include', '/discovery')
  })
})
