/* eslint-disable no-undef */
const el = require('./elements').ELEMENTS
export class Discovery {
  logout() {
    cy.get(el.logout).click()

    expect(localStorage.getItem('token')).to.eq(null)
    expect(localStorage.getItem('currentUser')).to.eq(null)
  }

  navToProfile() {
    cy.get(el.profile).click()

    cy.url().should('include', '/profile')
  }

  navToDiscovery() {
    cy.get(el.discovery).click()

    cy.url().should('include', '/discovery')
  }
}

export default new Discovery()
