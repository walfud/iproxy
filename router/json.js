import Router from 'koa-router'

const router = new Router()
router.get('/json', ctx => {
    ctx.body = JSON.stringify(ctx)
})