import React from 'react'
import SignUp from './signup'
import { FormHelper, ValidationStub } from '@/presentation/test'
import { cleanup, render, RenderResult } from '@testing-library/react'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp
    validation={validationStub}
    />
  )
  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut, 'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', 'Required field.')
    FormHelper.testStatusForField(sut, 'password', 'Required field.')
    FormHelper.testStatusForField(sut, 'passwordConfirmation', 'Required field.')
  })

  test('should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })
})
