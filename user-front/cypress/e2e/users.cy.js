describe("Gestão de usuários", () => {

  beforeEach(() => {
    cy.exec('npm --prefix ../user-api run clear:db')
  });

  describe("Listagem", () => {

    it("Contendo 1 usuário", () => {
      cy.request("POST", 'http://localhost:4000/users', {
        name: 'Michaelle',
        email: 'michaelle@michaelle.com'
      }).then(response => {
        expect(response.status).to.eq(201);
        cy.visit("/");
        cy.get('.relative > .w-full').should('have.length', 1)
      })
    });

    it("Sem usuários", () => {
      cy.visit('/')
      cy.contains('Nenhum usuário encontrado').should('exist')
    });

  });

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
  });

  it("Editando usuário", () => {

    cy.request("POST", "http://localhost:4000/users", {
      name: "Michaelle",
      email: "michaelle@michaelle.com"
    }).then(() => {
      cy.visit("/");
      cy.get('[data-cy="user-card"]').click();

      cy.get('[name="name"]').clear().type('Teste Cypress');
      cy.get('[name="email"]').clear().type('teste@cypress.com');
      cy.get('.flex-col-reverse > .bg-primary').click();
    });

  });

  it.only("Excluindo usuário", () => {

    cy.request("POST", "http://localhost:4000/users", {
      name: "Michaelle",
      email: "michaelle@michaelle.com"
    }).then(() => {
      cy.visit("/");
      cy.get('.bg-destructive').click();
      cy.contains('Nenhum usuário encontrado').should('exist')
    });

  });
});