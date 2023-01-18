
import {
  baseUrl,
  type,
  typeSlow,
  userAdm,
  userAdmPass,
  userCoord,
  userCoordPass,
  userPMS,
  userPMSPass,
  click,
  wait,
  checkUrl,
  autocomplete,
  checkTable,
  selectOption
} from './_cypress'

export function loginAdmin() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userAdm())
  wait(100)
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userAdmPass())
  wait(100)
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function loginCoordenador() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userCoord())
  wait(100)
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userCoordPass())
  wait(100)
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function loginPMS() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userPMS())
  wait(100)
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userPMSPass())
  wait(100)
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function novoOrcamento(testData) {
  cy.visit(baseUrl() + 'orcamento/orcamento.aspx')
  click('#MainContent_txtRazaoSocial');
  autocomplete('#MainContent_txtCodigo', testData.codCliente);
  wait(1000)
  click('#MainContent_upHeaderProdutos');
  wait(100)
  autocomplete('#MainContent_txtPesquisaProdutoRef', testData.codProduto);
  wait(1000)
  typeSlow('#MainContent_txtPesquisaProdutoN3', testData.desconto)
  typeSlow('#MainContent_txtPesquisaProdutoQtd', testData.quantidade)
  //lupa
  click('#Span6');
  wait(1000)
  //incluir produto
  click('#btPesquisarProduto2');
  wait(1000)
  click('#MainContent_btSalvar');
  wait(2000)
  click('#MainContent_rptProduto_chkExcluir_0');
  wait(1000)
  selectOption('#MainContent_dropAplicarAlteracao', "Desc. Adic.")
  wait(1000)
  typeSlow('#MainContent_txtAplicarValorN3', testData.desconto)
  wait(1000)
  click('#MainContent_btSalvar');
  wait(2000)
  click('#MainContent_btFinalizar')
  wait(2000)
}

export function confereOrcamento(testData) {
  cy.visit(baseUrl() + 'orcamento/default.aspx')
  click('#btnFiltrar');
  wait(5000)
  // primeiro da lista
  cy.xpath('/html/body/form/div[3]/div[2]/div/div[4]/div/table/tbody/tr[1]/td[17]/div/button').click()
  cy.xpath('/html/body/form/div[3]/div[2]/div/div[4]/div/table/tbody/tr[1]/td[17]/div/ul/li[2]/a').click()
  wait(2000)
  // confere se salvou 
  checkTable('#divProd1', [testData.quantidade, testData.codProduto], [3, 4])
  checkTable('#tableProdutos2', [testData.desconto], [9])
}

export function analiseDesconto(testData) {
  cy.scrollTo(0, 1000)
  cy.get('#MainContent_grdAnaliseSpecialDealOrcamento').find('tr')
    .then(listing => {
      const num = Cypress.$(listing).length - 2;
      click('#MainContent_grdAnaliseSpecialDealOrcamento_lnkbtAnaliseOrcamento_' + num);
      cy.wait(2000)
      cy.xpath('/html/body/form/div[3]/div[2]/div/ul/li[2]/a').click();
      typeSlow('#MainContent_txtObsReprovacao', 'auto-obs1')
      typeSlow('#MainContent_txtObservacoes', 'auto-obs2')
      click('#MainContent_lnkbtnAprovar');
      cy.wait(2000)
    });
  cy.wait(2000)
}

export function validacaoDesconto(testData) {
  cy.scrollTo(0, 1000)
  cy.get('#MainContent_grdAnaliseDescontoOrcamento').find('tr')
    .then(listing => {
      const num = Cypress.$(listing).length - 2;
      click('#MainContent_grdAnaliseDescontoOrcamento_lnkbtValidacaoOrcamento_' + num);
    });
  cy.wait(2000)
  click('#liValidacao');
  checkTable('#tblValidarDescontos', testData.planilha, [8, 9, 10]);
  cy.wait(1000)
  click('#liResumo');
  cy.wait(1000)
  cy.xpath('/html/body/form/div[3]/div[2]/div/div[5]/div/div[1]/table[1]/tbody/tr[14]/td[2]/span[3]').should('include.text', testData.vlrTotal)
  cy.xpath('/html/body/form/div[3]/div[2]/div/div[5]/div/div[1]/table[1]/tbody/tr[15]/td[2]/span[3]').should('include.text', testData.vlrDesc)
  cy.wait(1000)
}
