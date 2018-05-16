/**
 * 秘密代理
 * http://www.mimiip.com/
 */

import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

export default async function (saver) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    // Goto share
    const page = await browser.newPage()
    await page.goto('http://www.mimiip.com/')
    await page.waitForSelector('.list')
    const proxys = await page.$$eval('.list', x => {
        const proxys = []
        for (let i of x) {
            const ip = i.querySelector('td:nth-child(1)').innerText
            const port = i.querySelector('td:nth-child(2)').innerText
            proxys.push({
                ip,
                port,
            })
        }

        return proxys
    })

    for (let proxy of proxys) {
        saver(`${proxy.ip}:${proxy.port}`)
    }

    await browser.close()
}