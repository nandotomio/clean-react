import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  test('should call LocalStorageAdapter.get with correct value', () => {
    const fakeAccount = mockAccountModel()
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(fakeAccount)
    const account = getCurrentAccountAdapter()
    expect(getSpy).toHaveBeenCalledWith('account')
    expect(account).toEqual(fakeAccount)
  })
})