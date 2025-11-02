/// <reference types="cypress" />

const dayjs = require("dayjs");

import userData from '../fixtures/example.json';
import creditCard from '../fixtures/order/creditCard.json';
import { faker } from '@faker-js/faker'
import login from '../modules/login/index'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/login"]').click();
    });

    it('Test Case 1: Register User', () => {
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

        cy.get('input#first_name').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type(`PGATS ${faker.company.name()}`, { parseSpecialCharSequences: false });
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

        login.preencherFormularioDeLogin(userData.user, userData.password)

        // cy.get('[data-qa="login-email"]').type('qa-tester-1759532992943@test.com');
        // cy.get('[data-qa="login-password"]').type(`12345`);

        // cy.contains('button', 'Login').click();

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

describe('Continuação dos exercícios', () => {

    it('Test Case 6: Contact Us Form', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/contact_us"]').should('be.visible').click();
        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type('Test Case 6: Contact Us Form');
        cy.get('[data-qa="message"]').type('Exercicio Test Case 6: Contact Us Form ');

        cy.fixture('logo.png').as('arquivo')
        cy.get('[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click();
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
        cy.get('span').click();
    });


    it('Test Case 8: Verify All Products and product detail page', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/products"]').should('be.visible').click();

        // cy.get('#meu-elemento')
        //     .scrollIntoView()
        //     .should('be.visible');
        // cy.get('selector').scrollTo('center')
        cy.get('.title').should('contain', 'All Products')
        cy.get('a[href="/product_details/1"]').should('be.visible').click();
        cy.get('.product-information').should('contain', 'Blue Top');
    })

    it('Test Case 9: Search Product', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/products"]').should('be.visible').click();


        cy.get('.title').should('contain', 'All Products');
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();
        cy.get('.title').should('contain', 'Searched Products');
        cy.get('.productinfo > p').should('contain', 'Blue Top');
    })

    it('Test Case 10: Verify Subscription in home page', () => {

        cy.visit('https://www.automationexercise.com');

        cy.get('.single-widget > h2')
            .scrollIntoView()
            .should('be.visible');
        cy.get('#susbscribe_email').type(userData.email);
        cy.get('#subscribe').click();
        cy.get('#success-subscribe').should('contain', 'You have been successfully subscribed!');
    })

    it('Test Case 15: Place Order: Register before Checkout', () => {

        cy.visit('https://www.automationexercise.com');
        cy.get('a[href="/login"]').click();

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

        cy.get('input#first_name').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type(`PGATS ${faker.company.name()}`, { parseSpecialCharSequences: false });
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

        cy.contains('b', 'QA Tester');
        cy.contains(`Logged in as QA Tester`).should('be.visible');

        cy.get('[href="/product_details/3"]')
            .scrollIntoView()
            .click()

        cy.contains('button', 'Add to cart').click()
        cy.contains('a', 'View Cart').click()
        cy.contains('a', 'Proceed To Checkout').click()
        cy.contains('h2', 'Review Your Order').should('be.visible')
        cy.contains('a', 'Place Order').click()

        cy.fixture('order/creditCard').then((creditCard) => {
            cy.get('input[data-qa=name-on-card]').type(creditCard.nameOnCard)
            cy.get('input[data-qa=card-number]').type(creditCard.cardNumber)
            cy.get('input[data-qa=cvc]').type(creditCard.cvc)
            cy.get('input[data-qa=expiry-month]').type(creditCard.expirationMonth)
            cy.get('input[data-qa=expiry-year]').type(creditCard.expirationYear)
        })

        cy.contains('button', 'Pay and Confirm Order').click()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        cy.get('a[href="/delete_account"]').click();

        cy.url().should('includes', 'delete_account');
        cy.contains('b', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click();
    
    })

})