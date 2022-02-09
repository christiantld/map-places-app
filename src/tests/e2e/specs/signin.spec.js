/* eslint-disable no-undef */
/// <reference types="cypress">
import Home from '../support/pages/Home'
const el = require('../support/pages/Home/elements').ELEMENTS

describe('Header sign in', () => {
  it('should open and close sign in modal', () => {
    Home.openSignInModal()
    Home.closeSignInModal()
  })

  it('should create a new user', () => {
    Home.openSignInModal()
    Home.fillSignInModal()
    Home.submitSignIn()
  })
})

describe('Container sign in', () => {
  it('should open and close sign in modal', () => {
    cy.get(el.signIn).click()
    cy.get(el.signInModal).should('be.visible')
  })
})

describe('Sign in fail cases', () => {
  beforeEach(() => {
    cy.get(el.signIn).click()
  })

  it('should show an error message when user name and last name length is les than 3 characters', () => {
    Home.fillSignInModal('Jo', 'Do')

    Home.verifyNameAndSurnameLength()
  })

  it('should show an error message when email is not valid', () => {
    Home.fillSignInModal('John', 'Doe', 'john.doe@')

    Home.invalidEmailFormat()
  })

  it('should show an error message when password is invalid', () => {
    Home.fillSignInModal('John', 'Doe', 'john.doe@test.com', '123')

    Home.invalidPasswordFormat()
  })
})
