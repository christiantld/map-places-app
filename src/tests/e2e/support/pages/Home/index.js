/* eslint-disable no-undef */
const el = require('./elements').ELEMENTS

class Home {
  // Login In

  openLoginModal() {
    cy.get(el.login).click()
    cy.get(el.loginModal).should('be.visible')
  }

  closeLoginModal() {
    cy.get(el.closeLoginModal).click()
    cy.get(el.loginModal).should('not.exist')
  }

  fillLoginForm(email = Cypress.env('loginRequest').email, password = Cypress.env('loginRequest').password) {
    cy.get(el.emailInputLogin).type(email)
    cy.get(el.passwordInputLogin).type(password)
  }

  clickSubmitLoginButton() {
    cy.get(el.submitLogin).click()
  }

  successLoginResponse() {
    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      Cypress.env('token', response.body.token)
    })
  }

  interceptSuccessLoginResponse() {
    cy.intercept('POST', '**/login', { body: Cypress.env('loginResponse') }).as('login')
  }

  interceptErrorLoginResponse() {
    cy.intercept('POST', '**/login', { statusCode: 404 }).as('login')
  }

  submitLogin() {
    this.interceptSuccessLoginResponse()
    this.clickSubmitLoginButton()
    this.successLoginResponse()
  }

  login() {
    this.openLoginModal()
    this.fillLoginForm()
    this.submitLogin()
  }

  verifyIfTokenIsSavedAtLocalStorage() {
    cy.visit(`${'/'}`, {
      onBeforeLoad: (browser) => {
        expect(browser.localStorage.getItem('token')).to.eq(Cypress.env('token'))
      }
    })
  }

  verifyWrongDataToast() {
    cy.get('.Vue-Toastification__toast').contains('Verifique seus dados e tente novamente')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  }

  verifyUserNotFoundToast() {
    cy.get('.Vue-Toastification__toast').contains('Cadastro não encontrado')
    cy.wait(4000)
    cy.get('.Vue-Toastification__toast').should('not.exist')
  }

  // Sign In

  openSignInModal() {
    cy.get(el.signInHeader).click()
    cy.get(el.signInModal).should('be.visible')
  }

  closeSignInModal() {
    cy.get(el.closeSignInModal).click()
    cy.get(el.signInModal).should('not.exist')
  }

  fillSignInModal(
    name = Cypress.env('signinRequest').first_name,
    surname = Cypress.env('signinRequest').first_name,
    email = Cypress.env('signinRequest').email,
    password = Cypress.env('signinRequest').password) {
    cy.get(el.nameInputSignIn).type(name)
    cy.get(el.surnameInputSignIn).type(surname)
    cy.get(el.emailInputSignIn).type(email)
    cy.get(el.passwordInputSignIn).type(password)
  }

  verifyNameAndSurnameLength() {
    cy.get(el.nameInputSignInError).should('have.text', '*No mínimo 3 caracteres')
    cy.get(el.surnameInputSignInError).should('have.text', '*No mínimo 3 caracteres')
  }

  invalidEmailFormat() {
    cy.get(el.emailInputSignInError).should('have.text', '*Este campo precisa ser um e-mail')
  }

  invalidPasswordFormat() {
    cy.get(el.passwordInputSignInError).should('exist')
  }

  clickSubmitSignInButton() {
    cy.get(el.submitSignIn).click()
  }

  successSignInResponse() {
    cy.wait('@newUser').then(({ response }) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).has.property('token')
      expect(response.body).to.deep.equal({
        token: Cypress.env('signinResponse').token,
        id: Cypress.env('signinResponse').id
      })
    })
  }

  interceptSuccessSignInResponse() {
    cy.intercept('POST', '**/register', { body: Cypress.env('signinResponse') }).as('newUser')
  }

  interceptErrorSignInResponse() {
    cy.intercept('POST', '**/register', { statusCode: 404 }).as('newUser')
  }

  submitSignIn() {
    this.interceptSuccessSignInResponse()
    this.clickSubmitSignInButton()
    this.successSignInResponse()
  }

  signIn() {
    this.openSignInModal()
    this.fillSignInForm()
    this.submitSignIn()
  }
}

export default new Home()
