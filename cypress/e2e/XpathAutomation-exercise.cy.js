/// <reference types="cypress" />
import 'cypress-xpath'
import userData from '../fixtures/example.json'
import { getRandomNumber, getRandomEmail } from '../support/helpers'
import { fa, faker } from '@faker-js/faker'


describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })


  it('Cadastrar um usuário', () => {
    cy.contains('a', /login/i, { timeout: 10000 }).click()

    cy.xpath('//*[@data-qa="signup-name"]').type('QA Fer')
    cy.xpath('//*[@data-qa="signup-email"]').type(getRandomEmail())
    cy.xpath('//button[contains(text(), "Signup")]').click()

    cy.xpath('//input[@type="radio" and (@value="Mrs" or @value="Mrs.")]').check({ force: true })
    cy.xpath('//*[@data-qa="password"]').type('123456', { log: false })

    cy.xpath('//*[@data-qa="days"]').select('1')
    cy.xpath('//*[@data-qa="months"]').select('January')
    cy.xpath('//*[@data-qa="years"]').select('1990')

    cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check({ force: true })
    cy.xpath('//input[@type="checkbox" and @id="optin"]').check({ force: true })

    cy.xpath('//*[@data-qa="first_name"]').type(faker.person.firstName())
    cy.xpath('//*[@data-qa="last_name"]').type(faker.person.lastName())
    cy.xpath('//*[@data-qa="company"]').type(faker.company.name())
    cy.xpath('//*[@data-qa="address"]').type(faker.location.streetAddress())

    cy.xpath('//*[@data-qa="country"]').select('Canada')
    cy.xpath('//*[@data-qa="state"]').type(faker.location.state())
    cy.xpath('//*[@data-qa="city"]').type(faker.location.city())
    cy.xpath('//*[@data-qa="zipcode"]').type(faker.location.zipCode())
    cy.xpath('//*[@data-qa="mobile_number"]').type('9999999999')

    cy.xpath('//*[@data-qa="create-account"]').click()

    cy.url().should('include', 'account_created')
    cy.xpath('//b[contains(normalize-space(),"Account Created")]').should('be.visible')

    cy.xpath('//*[@data-qa="continue-button"]').click()
  })

  it('Login de usuário com e-mail e senha corretos', () => {
    cy.contains('a', /login/i, { timeout: 10000 }).click()

    cy.xpath('//*[@data-qa="login-email"]').type('fer-qa_Lockman-Pagac43@hotmail.com')
    cy.xpath('//*[@data-qa="login-password"]').type('123456', { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()
    cy.xpath('//b[contains(text(), "QA Fer")]').should('be.visible')
  })

  it('Login de usuário com e-mail e senha incorretos', () => {
    cy.contains('a', /login/i, { timeout: 10000 }).click()

    cy.xpath('//*[@data-qa="login-email"]').type('fer-1759530412987@teste.com')
    cy.xpath('//*[@data-qa="login-password"]').type('120456', { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()
    cy.xpath('//div[contains(@class,"login-form")]//form//p[contains(text(),"Your email or password is incorrect!")]')
      .should('be.visible')
  })

  it('Logout de usuário com e-mail e senha corretos', () => {
    
    cy.contains('a', /login/i, { timeout: 10000 }).click()
    
    cy.xpath('//*[@data-qa="login-email"]').type('fer-qa_Lockman-Pagac43@hotmail.com')
    cy.xpath('//*[@data-qa="login-password"]').type('123456', { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()
    cy.xpath('//div[contains(@class,"shop-menu")]//a[contains(normalize-space(),"Logout")]').should('be.visible').click()
    cy.xpath('//h2[contains(text(),"Login to your account")]').should('be.visible')
  })

  it('Cadastrar usuário com e-mail e senha existente', () => {

    cy.contains('a', /login/i, { timeout: 10000 }).click()

    cy.xpath('//*[@data-qa="signup-name"]').type('QA Fer')
    cy.xpath('//*[@data-qa="signup-email"]').type('fer-qa_Lockman-Pagac43@hotmail.com')
    cy.xpath('//button[contains(text(), "Signup")]').click()
    cy.xpath('//div[contains(@class,"signup-form")]//form//p[contains(text(),"Email Address already exist!")]')
      .should('be.visible')
  })

  it('Enviar um formulário de contato', () => {
    cy.xpath('//a[contains(normalize-space(),"Contact") or contains(normalize-space(),"Contact us") or contains(@href,"contact")]')
      .should('be.visible')
      .click()

    cy.xpath('//*[@data-qa="name"]').type(userData.name)
    cy.xpath('//*[@data-qa="email"]').type('fer-qa_Lockman-Pagac43@hotmail.com')
    cy.xpath('//*[@data-qa="subject"]').type('Test Case 6: Contact Us Form')
    cy.xpath('//*[@data-qa="message"]').type('Exercicio Test Case 6: Contact Us Form')

    cy.fixture('logo.png').as('file')
    cy.xpath('//input[@type="file"]').selectFile('@file')

    cy.xpath('//*[@data-qa="submit-button"]').click()
    cy.xpath('//div[contains(@class,"status")]').should('be.visible')
    cy.xpath('//div[contains(@class,"status")]').should(
      'have.text',
      'Success! Your details have been submitted successfully.'
    )
  })
})