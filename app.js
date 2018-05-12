import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const app = new Koa()
app.use(logger())
app.use(bodyParser())

const root = new Router()
root.use('/json', require('./router/json').routes())
app.use(root)

app.listen(3000)
console.log(`Listen at 3000`)