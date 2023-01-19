
export function get(id) {
  cy.wait(500);
  return cy.get(id);
}

export function clear(id) {
  get(id).clear();
}

export function click(id) {
  get(id).click();
}

export function type(id, text, _clear, options) {
  if (_clear == true)
    clear(id)
  get(id).type(text, options);
}

export function typeSlow(id, text) {
  get(id).type(text, { delay: 200 });
}

export function autocomplete(id, text) {
  get(id)
    .type(text, { delay: 150 })
    .wait(500)
    .type('{enter}');

  get(id).type('{enter}');

  cy.wait(500);
}

export function checkTable(id, values_check, indexes) {
  let values = []
  cy.get(id)
    .find('td')
    .each(($el, $index) => {
      cy.wrap($el)
        .invoke('text')
        .then(text => {
          for (let i = 0; i < indexes.length; i++) {
            if ($index == indexes[i]) {
              values.push(text.trim())
            }
          }
        })
    })
    .then(() => {
      expect(values).to.deep.eq(values_check)
    })
}

export function getValueFromTable(id, indexTo) {
  cy.get(id)
    .find('td')
    .each(($el, $index) => {
      cy.wrap($el)
        .invoke('text')
        .then(text => {
          if ($index == indexTo) {
            return text.trim()
          }
        })
    })
}


export function checkTextContains(id, text) {
  get(id).should('include.text', text)
}

export function checkTextValue(id, text) {
  get(id).should('have.value', text)
}

export function wait(ms) {
  cy.wait(ms);
}

export function baseUrl() {
  return Cypress.env('baseUrl_ABB')
}

export function userAdm() {
  return Cypress.env('userAdm_ABB')
}

export function userCoord() {
  return Cypress.env('userCoord_ABB')
}

export function userCoordPass() {
  return Cypress.env('userCoordPassword_ABB')
}

export function userPMS() {
  return Cypress.env('userPMS_ABB')
}

export function userPMSPass() {
  return Cypress.env('userPMSPassword_ABB')
}

export function userAdmPass() {
  return Cypress.env('userAdmPassword_ABB')
}

export function selectOption(id, option_text) {
  get(id).select(option_text);
}

export function checkSelectOptionSelected(id, text) {
  get('select' + id + ' option:selected').should('have.text', text)
}

export function checkUrl(url) {
  cy.url().should('eq', url)
}
