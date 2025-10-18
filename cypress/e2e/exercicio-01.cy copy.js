/// <reference types="cypress" />

const dayjs = require("dayjs");

import userData from '../fixtures/example.json';
import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/login"]').click();
    });

    it('Exemplos de Logs', () => {
        cy.log(`STEP 1 :: PGATS AUTOMACÃO WEB CY LOG`)

        cy.log(`Nome do usuário: ${userData.name}`)
    })

    it.only('Test Case 1: Register User', () => {
        const timestamp = new Date().getTime();
        const todayDate = dayjs(Date.now());

        cy.get('[data-qa="signup-name"]').type('QA Tester');
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`);
        cy.contains('button', 'Signup').click();

        cy.get('input[type="radio"]').check('Mrs');
        cy.get('input#password').type('12345', { log: false });
        cy.get('#days').select(todayDate.daysInMonth());
        cy.get('#months').select(todayDate.month());
        cy.get('[data-qa="years"]').select('1992');

        cy.get('input[type="checkbox"]#newsletter').check();
        cy.get('input#optin').click();

        cy.get('input#first_name').type(faker.person.firstName);
        cy.get('input#last_name').type(faker.person.lastName);
        cy.get('input#company').type(`PGATS ${faker.company.name}`);
        cy.get('input#address1').type('Avenida Selenium, n 2004');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('California');
        cy.get('input#city').type('Los Angeles');
        cy.get('[data-qa="zipcode"]').type('90001');
        cy.get('[data-qa="mobile_number"]').type('111 222 333');

        cy.get('[data-qa="create-account"]').click();

        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click();

        cy.get('a[href="/delete_account"]').click();

        cy.url().should('includes', 'delete_account');
        cy.contains('b', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click();

    });

    it('Test Case 2: Login User with correct email and password', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester-1759532992943@test.com');
        cy.get('[data-qa="login-password"]').type(`12345`);

        cy.contains('button', 'Login').click();

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible');

        cy.contains('b', 'QA Tester');
        cy.contains(`Logged in as QA Tester`).should('be.visible')
    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester-1759532992943@test.com');
        cy.get('[data-qa="login-password"]').type(`123456`);
        cy.contains('button', 'Login').click();
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
    });

    it('Test Case 4: Logout User', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester-1759532992943@test.com');
        cy.get('[data-qa="login-password"]').type(`12345`);
        cy.contains('button', 'Login').click();
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', 'QA Tester');
        cy.contains(`Logged in as QA Tester`)
        cy.get('a[href="/logout"]').should('be.visible').click();
        cy.url().should('contain', 'login')
        cy.contains('Login to your account');
        cy.get('a[href="/logout"]').should('not.exist');
        cy.get('a[href="/login"]').should('contain', 'Signup / Login');
    })

    it('Test Case 5: Register User with existing email', () => {

        cy.get('[data-qa="signup-name"]').type('QA Tester');
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1759532992943@test.com`);
        cy.contains('button', 'Signup').click();
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    });

})

describe ('Continuação dos exercícios', () => {

    it('Test Case 6: Contact Us Form', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/contact_us"]').should('be.visible').click();
        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type('Test Case 6: Contact Us Form');
        cy.get('[data-qa="message"]').type('Exercicio Test Case 6: Contact Us Form ');

        // cy.get('[name="upload_file"]').selectFile('cypress/fixtures/logo2.png')

        cy.fixture('logo.png').as('arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
        cy.get('span').click();
    });

    it('Test Case 7: Verify Test Cases Page', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/test_cases"]').first().should('be.visible').click();
        cy.get('a[href="/test_cases"]').should('contain', 'Test Cases');

    });

    it('Test Case 8: Verify All Products and product detail page', () => {

         cy.visit('https://www.automationexercise.com');
        
    })
})