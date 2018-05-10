import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const app = new Koa()
app.use(logger())
app.use(bodyParser())

app.listen(3000)