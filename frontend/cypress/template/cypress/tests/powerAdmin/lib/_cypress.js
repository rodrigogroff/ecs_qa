
export function get(id) {
  cy.wait(50);
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
  return Cypress.env('baseUrl_PA')
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
