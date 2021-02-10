import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/test'
import faker from 'faker'

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})