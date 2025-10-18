/// <reference types="cypress" />

const dayjs = require("dayjs");

describe('Automation Exercise', () => {

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime();
        const todayDate = dayjs(Date.now());

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/login"]').click();

        cy.get('[data-qa="signup-name"]').type('QA Teste');
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`);
        cy.contains('button','Signup').click();
        cy.get('input[type="radio"]').check('Mrs');
        cy.get('input#password').type('12345', {log: false});

        cy.get('#days').select(todayDate.daysInMonth());
        // cy.get('[data-qa="days"]').select('20');
        cy.get('#months').select(todayDate.month());
        // cy.get('[data-qa="months"]').select('September');
        cy.get('[data-qa="years"]').select('1992');

        cy.get('input[type="checkbox"]#newsletter').check();
        // cy.get('input#newsletter').click();
        cy.get('input#optin').click();

        cy.get('input#first_name').type('Bob');
        cy.get('input#last_name').type('Narciso Pipoca');
        cy.get('input#company').type('PGATS');
        cy.get('input#address1').type('Avenida Selenium, n 2004');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('California');
        cy.get('input#city').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('90001');
        cy.get('[data-qa="mobile_number"]').type('111 222 333');
        cy.get('[data-qa="create-account"]').click();
       
        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!')

        
    })
    
})

