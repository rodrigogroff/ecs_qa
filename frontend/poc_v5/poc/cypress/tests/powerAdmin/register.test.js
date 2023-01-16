import { baseUrl, checkUrl } from './lib/_cypress'
import { generateUUID, mainPassword, checkForMessage, checkForErrorMessage } from './lib/_util'
import { fillRegisterForm, fillLoginForm } from './lib/_user_lib.js'

describe('Register page [1]', () => {
  it('Submits ok form', () => {
    cy.visit(baseUrl() + 'register')
    let user = 'user' + generateUUID() + '@test.com.br';
    fillRegisterForm('company' + generateUUID(), user, mainPassword())
    checkForMessage('Registro efetuado')
    cy.visit(baseUrl() + 'login')
    fillLoginForm(user, mainPassword())
    // check for dashboard routing (OK)
    checkUrl(Cypress.env('baseUrl'))
  })
})

describe('Register page [2]', () => {
  it('Visits the register page', () => {
    cy.fixture("powerAdmin/fail_register.json").then((jsonData) => {
      for (let i = 0; i < jsonData.length; i++) {
        let userData = jsonData[i];
        cy.visit(baseUrl() + 'register')
        fillRegisterForm(userData.Company, userData.User, userData.Pass)
        checkForErrorMessage(userData.expectedError);
      }
    });
  })
})

