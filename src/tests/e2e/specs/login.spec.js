/* eslint-disable no-undef */
/// <reference types="cypress">

import Home from '../support/pages/Home'

describe('Login', () => {
  it('should open and close login modal', () => {
    Home.openLoginModal()
    Home.closeLoginModal()
  })

  it('should open login modal and perform login', () => {
    Home.login()
    cy.url().should('include', '/discovery')
  })

  it('should save token at localStorage', () => {
    Home.login()
    Home.verifyIfTokenIsSavedAtLocalStorage()
  })

  it('should try to login without fill the input fields', () => {
    Home.openLoginModal()

    Home.clickSubmitLoginButton()

    Home.verifyWrongDataToast()
  })

  it('should try to login with invalid credentials', () => {
    Home.openLoginModal()
    Home.fillLoginForm('eve.holt@reqres.com', 'test123')
    Home.interceptErrorLoginResponse()
    Home.clickSubmitLoginButton()

    Home.verifyUserNotFoundToast()
  })
})
