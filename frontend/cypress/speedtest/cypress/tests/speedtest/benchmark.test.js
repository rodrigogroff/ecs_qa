
import { click, } from './lib/_cypress'

describe('Verifica velocidade da internet', () => {
  it('x', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.visit('https://www.speedtest.net/pt')
    click('#onetrust-accept-btn-handler');
    cy.xpath('/html/body/div[3]/div/div[3]/div/div/div/div[2]/div[3]/div[1]/a/span[4]').click();
    cy.wait(48000);
    cy.xpath('/html/body/div[3]/div/div[3]/div/div/div/div[2]/div[3]/div[3]/div/div[3]/div/div/div[2]/div[2]/div/span[2]/span').
      then($pingButton => {
        var ping = parseInt($pingButton.text())
        cy.log(ping)
        cy.wrap(ping).should('be.gt', 10);
        cy.wait(2000);
        return;
      })
  })
})
