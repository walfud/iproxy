import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

// Sniffer Service
setInterval(function () {
    // TODO: mongodb
    const proxies = []
    function saver(proxy) {
        if (!Array.isArray(proxy)) {
            proxy = [proxy]
        }

        for (let i of proxy) {
            if (i && i.replace(/[^.]/g, '').length === 3 && i.replace(/[^:]/g, '').length === 1) {
                proxies.push(i)
            }
        } 
    }
    for (let file of fs.readdirSync('./sniffer')) {
        console.log(`loading sniffer: ${file}`)

        const { name } = path.parse(file)
        require(`./sniffer/${name}`).default(saver)
    }
}, 1 * 1000);

// Server
(function () {
    const app = new Koa()
    app.use(logger())
    app.use(bodyParser())

    const root = new Router()
    root.get('/', ctx => {
        ctx.body = 'Hello World'
    })

    // Load all routers
    for (let file of fs.readdirSync('./router')) {
        console.log(`loading module: ${file}`)

        const { name } = path.parse(file)
        root.use(`/${name}`, require(`./router/${name}`).default.routes())
    }
    app.use(root.routes())

    app.listen(3000)
    console.log(`Listen at 3000`)
})();