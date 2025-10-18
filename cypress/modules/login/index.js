class Login {
    preencherFormularioDeLogin() {
        cy.get('[data-qa="login-email"]').type('qa-tester-1759532992943@test.com');
        cy.get('[data-qa="login-password"]').type(`12345`);

        cy.contains('button', 'Login').click();
    }


}

export default new Login()