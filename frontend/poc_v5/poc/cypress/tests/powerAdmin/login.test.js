import { baseUrl, checkUrl } from './lib/_cypress'
import { mainPassword, autoRegister, checkForErrorMessage } from './lib/_util'
import { fillLoginForm } from './lib/_user_lib'

describe('Login page [1]', () => {
  it('Using the auto register, submit OK form', () => {
    autoRegister();
    var user = sessionStorage.getItem('user');
    cy.visit(baseUrl() + 'login')
    fillLoginForm(user, mainPassword())
    // redireciona ao dashboard (OK)
    checkUrl(Cypress.env('baseUrl'))
  })
})

describe('Login page [2]', () => {
  it('Using the json array, submit NOK form for several tests', () => {
    cy.fixture("powerAdmin/fail_login.json").then((jsonData) => {
      for (let i = 0; i < jsonData.length; i++) {
        let userData = jsonData[i];
        cy.visit(baseUrl() + 'login')
        fillLoginForm(userData.User, userData.Pass)
        checkForErrorMessage(userData.expectedError)
      }
    });
  })
})
