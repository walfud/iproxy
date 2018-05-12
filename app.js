import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const app = new Koa()
app.use(logger())
app.use(bodyParser())

const root = new Router()
root.get('/', ctx => {
    ctx.body = 'Hello World'
})
root.use('/json', require('./router/json').default.routes())
app.use(root.routes())

app.listen(3000)
console.log(`Listen at 3000`)