import {
  get,
  wait,
  click,
  clear,
  baseUrl,
  type,
  selectOption,
  checkTextValue,
  checkSelectOptionSelected
} from './_cypress'

export function fillRegisterForm(company, user, pass) {
  type('#formCompany', company, true)
  type('#formUser', user, true)
  type('#formPass', pass, true)
  click('#btnSubmit')
}

export function fillLoginForm(user, pass) {
  type('#formUser', user, true)
  type('#formPass', pass, true)
  get('#btnSubmit').click()
}

export function findFirstUser() {
  cy.visit(baseUrl() + 'users')
  click("#btnSubmit");
  get('[id="0"]').first().click();
}

export function setupUserForm(phone, userType, userName, userEmail) {
  if (userName !== undefined && userName != null) {
    clear("#formName");
    type("#formName", userName, true)
  }
  if (userEmail !== undefined && userEmail != null) {
    clear("#formEmail");
    type("#formEmail", userEmail, true);
  }
  if (phone !== undefined && phone != null) {
    clear("#formPhone");
    click("#formPhone");
    type("#formPhone", phone, true, { delay: 150 });
  }
  if (userType !== undefined && userType != null) {
    // clicar no botão para acrescentar tipo
    click("#btnPlusNewUserType")
    // acrescentar tipo
    type("#formNewUserType_Name", userType)
    // clicar no botão para acrescentar tipo
    click("#btnNewUserType")
    // selecionar o 'select'
    selectOption('#formProfile', userType)
  }
  click("#btnSubmit");
  wait(3500);
}

export function checkUserForm(phone, userType, userName, userEmail) {
  if (phone !== undefined) {
    checkTextValue("#formPhone", phone); // confere se telefone salvou (usar mascara)
  }
  if (userType != undefined) {
    checkSelectOptionSelected('#formProfile', userType);
  }
  if (userName != undefined) {
    checkTextValue("#formName", userName);
  }
  if (userEmail != undefined) {
    checkTextValue("#formEmail", userEmail);
  }
}

export function searchUser() {
  wait(500);
  cy.visit(baseUrl() + 'users')
  click("#btnSubmit"); // clicar no botão "pesquisar"
  get('[id="0"]').first().click(); // clicar na primeira linha
  wait(1500);
}
