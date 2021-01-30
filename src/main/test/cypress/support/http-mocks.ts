import { Method } from 'axios'
import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.word()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.randomize([400, 404, 500]),
    body: {
      error: faker.random.word()
    }
  }).as('request')
}

export const mockOk = (url: RegExp, method: Method, response: any): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response
  }).as('request')
}
