class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  navegarParaContact() {
    cy.get('a[href="/contact_us"]').should('be.visible').click()
  }
}

export default new Menu()