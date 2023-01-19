
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
  getValueFromTable,
  selectOption
} from './_cypress'

export function loginAdmin() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userAdm())
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userAdmPass())
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function loginCoordenador() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userCoord())
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userCoordPass())
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function loginPMS() {
  cy.visit(baseUrl() + 'Login.aspx')
  click('#MainContent_tbUsuario')
  type('#MainContent_tbUsuario', userPMS())
  click('#MainContent_tbSenha')
  type('#MainContent_tbSenha', userPMSPass())
  click('#MainContent_lnkLogin');
  wait(2000);
  checkUrl(baseUrl() + 'default.aspx')
}

export function novoOrcamento(testData) {

  cy.visit(baseUrl() + 'orcamento/orcamento.aspx')
  var orc_number = '';
  wait(2000) // nao tirar!!!!
  cy.xpath('/html/body/form/div[3]/div[2]/div/div[1]/div/div/h4/label').then($value => {
    var sp = $value.text().split("-");
    orc_number = sp[1].toString() + sp[2].toString();
    cy.log('orçamento')
    cy.log(orc_number)
    localStorage.setItem('orcamento', orc_number);
    cy.writeFile("localStorage.txt", orc_number);
    wait(1000)
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
    wait(2000)
    selectOption('#MainContent_dropAplicarAlteracao', "Desc. Adic.")
    wait(2000)
    typeSlow('#MainContent_txtAplicarValorN3', testData.desconto)
    wait(2000)
    click('#MainContent_btSalvar');
    wait(7000)
    click('#MainContent_btFinalizar')
    wait(7000)
  });
}

export function analiseDesconto(testData) {

  cy.readFile('localStorage.txt').then($value => {
    testData.orcamento = $value;
  });
  cy.wait(1000);

  cy.log('orcamento')
  cy.log(testData.orcamento)
  cy.wait(1000)
  cy.get('#MainContent_grdAnaliseSpecialDealOrcamento').find('tr')
    .then(listing => {
      const num = Cypress.$(listing).length - 2;
      for (let i = 2; i < num; ++i) {
        cy.log('check row ' + i)
        wait(2000)
        cy.xpath('/html/body/form/div[3]/div[2]/div/div[4]/div[1]/div/center/table/tbody/tr[1]/td/div/table/tbody/tr[' + i + ']/td[2]/input')
          .then($value => {
            wait(200)
            cy.log('orcInline text')
            cy.log($value.text())
            wait(2000)
            var sp = $value.text().split("-");
            if (sp.length > 2) {
              cy.log('orcInline array')
              cy.log(sp)
              var orcInline = sp[1].toString() + sp[2].toString();
              cy.log('orcInline')
              cy.log(orcInline)
              wait(2000)
              cy.log('check ' + orcInline + ' == ' + testData.orcamento)
              if (orcInline == testData.orcamento) {
                click('#MainContent_grdAnaliseSpecialDealOrcamento_lnkbtAnaliseOrcamento_' + i);
                cy.wait(2000)
                cy.xpath('/html/body/form/div[3]/div[2]/div/ul/li[2]/a').click();
                typeSlow('#MainContent_txtObsReprovacao', 'auto-obs1')
                typeSlow('#MainContent_txtObservacoes', 'auto-obs2')
                click('#MainContent_lnkbtnAprovar');
                cy.wait(2000)
              }
            }
          })
      }
    });
  cy.wait(2000)
}

export function validacaoDesconto(testData) {

  cy.readFile('localStorage.txt').then($value => {
    testData.orcamento = $value;
  });
  cy.wait(1000);

  cy.scrollTo(0, 1000)
  cy.get('#MainContent_grdAnaliseDescontoOrcamento').find('tr')
    .then(listing => {
      const num = Cypress.$(listing).length - 2;
      for (let i = 2; i < num; ++i) {
        cy.xpath('/html/body/form/div[3]/div[2]/div/div[4]/div[1]/div/center/table/tbody/tr[2]/td/div/table/tbody/tr[' + i + ']/td[2]/input').then($value => {
          var sp = $value.text().split("-");
          if (sp.length > 2) {
            cy.log('orcInline array')
            cy.log(sp)
            var orcInline = sp[1].toString() + sp[2].toString();
            cy.log('orcInline')
            cy.log(orcInline)
            if (orcInline == testData.orcamento) {
              click('#MainContent_grdAnaliseDescontoOrcamento_lnkbtValidacaoOrcamento_' + i);
              cy.wait(5000)
              click('#liValidacao');
              checkTable('#tblValidarDescontos', testData.planilha, [8, 9, 10]);
              cy.wait(1000)
              click('#liResumo');
              cy.wait(1000)
              cy.xpath('/html/body/form/div[3]/div[2]/div/div[5]/div/div[1]/table[1]/tbody/tr[14]/td[2]/span[3]').should('include.text', testData.vlrTotal)
              cy.xpath('/html/body/form/div[3]/div[2]/div/div[5]/div/div[1]/table[1]/tbody/tr[15]/td[2]/span[3]').should('include.text', testData.vlrDesc)
              cy.wait(1000)
            }
          }
        })
      }
    });
}
