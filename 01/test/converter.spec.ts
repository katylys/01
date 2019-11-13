import * as supertest from 'supertest'
import { stub, SinonStub } from 'sinon'
import { server } from '../src/main'
import { Converter } from '../src/types/types'
import * as CONVERTER from '../src/converter/convert'

export const createGetTester = (url: string) => {
  return (q: any, status: number, res?: any) => {
    const r = supertest(server)
      .get(url)
      .query(q)

    if (res != null) {
      return r.expect(status, res)
    }
    return r.expect(status)
  }
}
export const testStartPage = createGetTester(Converter.URL)
export const testConvert = createGetTester(Converter.Convert.URL)

describe('converter', async () => {
  let stubExchangerate: SinonStub

  after(() => {
    stubExchangerate.restore()
    server.close()
  })

  it('200, test of start page', () => {
    return testStartPage('', 200)
  })

  it('400, empty arguments for conversion', () => {
    return testConvert('', 400)
  })

  it('400, wrong arguments for conversion', () => {
    const params = {
      sum: -2,
      currencyFrom: 'wrong',
      currencyTo: 'AED',
    }
    return testConvert(params, 400)
  })

  it('200, success conversion', () => {
    stubExchangerate = stub(CONVERTER, 'CurrentCurrency').resolves({
      base: 'RUB',
      date: new Date(),
      time_last_updates: 1,
      rates: {
        Currency: 12,
      },
    })
    const params: Converter.Convert.Request = {
      sum: 2,
      currencyFrom: 'RUB',
      currencyTo: 'THB',
    }
    return testConvert(params, 200)
  })
})
