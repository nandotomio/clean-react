import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { ValidationStub, FormHelper } from '@/presentation/test'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { AuthenticationSpy } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock
    }}
    >
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  FormHelper.populateField('email', email)
  FormHelper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    FormHelper.testStatusForField('email', validationError)
    FormHelper.testStatusForField('password', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password', validationError)
  })

  test('should show password state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('password')
    FormHelper.testStatusForField('password')
  })

  test('should show email state if Validation succeeds', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.testStatusForField('email')
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    FormHelper.populateField('email')
    FormHelper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('should call SetCurrentAccount with correct value', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    makeSut()
    const signup = screen.getByTestId('signup-link')
    fireEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
