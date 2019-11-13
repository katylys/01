import * as request from 'request-promise-native'

import { Currency } from './currencies'
import { Converter } from '../types/types'
import { ValidateConverter } from '../validation/validate'

export const CurrentCurrency = async (currency: keyof typeof Currency): Promise<Converter.Convert.ResponseHttp> => {
  return request({
    json: true,
    baseUrl: 'https://api.exchangerate-api.com',
    method: 'GET',
    uri: '/v4/latest/' + currency,
    timeout: 15000,
  })
}

export const Convert = async (params: Converter.Convert.Request): Promise<Converter.Convert.Response> => {
  if (!ValidateConverter(params)) {
    throw new Error('Ошибка валидации.Введите корректные данные')
  }
  const result = await CurrentCurrency(params.currencyFrom)
    .then((response) => {
        return {
          sum: (response.rates[params.currencyTo] * params.sum).toFixed(3),
          currencyFrom: params.currencyFrom,
          currencyTo: params.currencyTo,
        }
    })
    .catch((error) => {
      throw new Error(error)
    })

  return result
}
