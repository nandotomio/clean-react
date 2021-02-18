import { currentAccountState, PrivateRoute } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import React from 'react'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: () => account }
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>
  )
  return {
    history
  }
}

describe('PrivateRoute Component', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
