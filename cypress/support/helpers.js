import {faker} from '@faker-js/faker'

export function getRandomNumber() {
    const timestamp = new Date().getTime();
}

export function getRandomEmail(){
    return faker.internet.email({firstName: 'fer-qa'})
}