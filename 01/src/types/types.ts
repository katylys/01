import { Currency } from '../converter/currencies'

export namespace Converter {

    export const URL = '/*'

    export interface IRate {
        [key: string]: number
    }

    export namespace Convert {
        export const URL = '/convert' // tslint:disable-line

        export type Request = {
            sum: number,
            currencyFrom: keyof typeof Currency,
            currencyTo: keyof typeof Currency,
        }

        export type Response = {
            sum: string,
            currencyFrom: keyof typeof Currency,
            currencyTo: keyof typeof Currency,
        }

        export type ResponseHttp = {
            base: keyof typeof Currency,
            date: Date,
            time_last_updates: number,
            rates: IRate
        }
    }
}
