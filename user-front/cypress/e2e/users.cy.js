describe("Gestão de usuários", () => {

  it("Criar um novo usuário", () => {

    // abrir formulário de cadastro
    cy.visit("/");
    cy.get('div.flex > .inline-flex').click();

    // preenchendo dados de cadastro
    cy.get('[name="name"]').type('Teste No Cypress');
    cy.get('[name="email"]').type('teste@cypress.com');

    // clicando em salvar usuário
    cy.get('.flex-col-reverse > .bg-primary').click();
    cy.get
  })
})