import Router from 'koa-router'

const router = new Router()
router.get('/', ctx => {
    ctx.body = JSON.stringify(ctx)
})

export default router