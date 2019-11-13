import * as Koa from 'koa'
import * as koaRouter from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as render from 'koa-ejs'

import { createServer } from 'http'
import * as fs from 'fs'

import { Convert } from './converter/convert'
import { Currency } from './converter/currencies'
import { Converter } from './types/types'

const app = new Koa()
const router = new koaRouter()

render(app, {
  root: './',
  layout: 'views/index',
  viewExt: 'html',
  cache: false,
  debug: false,
})

router.get(Converter.Convert.URL, async (ctx: Koa.Context) => {
  await Convert(ctx.request.query)
    .then(async (result) => {
      await ctx.render('views/index', {
        result: result.sum + ','
          + Currency[result.currencyFrom] + ','
          + Currency[result.currencyTo] + ','
          + result.currencyTo,
      })
    })
    .catch(async (error: Error) => {
      const isErrorValidation = error.message.includes('Ошибка валидации')
      ctx.status = isErrorValidation ? 400 : 500
      await ctx.render('views/index', {
        result: error.message,
      })
    })

})
router.get(Converter.URL, (ctx: Koa.Context) => {
  ctx.response.type = 'html'
  ctx.response.body = fs.readFileSync('views/index.html')
})

app.use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())

// for tests
export const server = createServer(app.callback())
server.listen(3000, () => {
  console.log(`htc-api is listening on port 3000`)
})
