import { Converter } from '../types/types'
import { Validator } from 'class-validator'
import { Currency } from '../converter/currencies'

export const ValidateConverter = (params: Converter.Convert.Request) => {
    const validator = new Validator()
    return validator.isPositive(+params.sum)
        && validator.isIn(params.currencyFrom, Object.keys(Currency))
        && validator.isIn(params.currencyFrom, Object.keys(Currency))
}
