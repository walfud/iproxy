import fs from 'fs'
import path from 'path'
import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

const proxys = []

// Sniffer Service
setInterval(function () {
    function saver(where, proxy) {
        if (!Array.isArray(proxy)) {
            proxy = [proxy]
        }

        for (let i of proxy) {
            if (i && i.replace(/[^.]/g, '').length === 3 && i.replace(/[^:]/g, '').length === 1) {
                proxys.push(i)
                console.log(`${where} add: ${i}`)
            }
        }
    }

    // Refresh
    proxys.splice(0)
    for (let file of fs.readdirSync('./sniffer')) {
        console.log(`loading sniffer: ${file}`)

        const { name } = path.parse(file);
        (async function () {
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            })
            try {
                const page = await browser.newPage()
                await require(`./sniffer/${name}`).default(page, fetch, (proxy) => saver(name, proxy))
            } catch (err) {
                console.log(err)
            } finally {
                browser && browser.close()
            }
        })()
    }
}, 60 * 60 * 1000);

// Server
const app = new Koa()
app.use(logger())
app.use(bodyParser())

const root = new Router()
root.get('/', ctx => {
    ctx.body = proxys
})
app.use(root.routes())

app.listen(3000)
console.log(`Listen at 3000`)