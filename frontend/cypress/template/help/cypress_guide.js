
// ------------------------------
// Comandos cypress
// ------------------------------

// navegar para o site
cy.visit("https://gooogle.com");

// espera 500 milis
cy.wait(500);

// obtem, por ID, o elemento html
cy.get("#formUser");

// obtem, por ID, o elemento html e digita algo
cy.get("#formCompany").type("company");

// confere se telefone salvou (usar mascara)
cy.get("#formPhone").should('have.value', '(51) 99515-2432');

// clicar no botão
cy.get("#btnSubmit").click();

// confere texto parcial do campo
cy.get("#popUpSystemTextOK").should("include.text", "Registro efetuado");

// confere se a URL bate com o teste
cy.url().should("eq", "teste");

// busca no environment do module exports
Cypress.env("baseUrl");

cy.fixture("powerAdmin/wrong_user.json").then((jsonData) => {
	// usa JSON simples
});

cy.fixture("powerAdmin/wrong_users.json").then((jsonData) => {
	// percorre array
	for (let i = 0; i < jsonData.length; i++) {
		let userData = jsonData[i];
	}
});

// usar um tipo de seletor diferente
cy.get('[id="0"]').first().click();

// forçar uma seleção
cy.get('#formProfile').select('Perfil Um');

// conferir uma seleção
cy.get('select#formProfile option:selected').should('have.text', 'Perfil Um')
