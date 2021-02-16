import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'
import faker from 'faker'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Oops. Something went wrong. Please try again later.')
  })
})
