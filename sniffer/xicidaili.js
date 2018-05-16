/**
 * 西刺代理
 * http://www.xicidaili.com/
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
    await page.goto('http://www.xicidaili.com/')
    await page.waitForSelector('#ip_list > tbody > tr.odd')
    const proxys = await page.$$eval('#ip_list > tbody > tr.odd', x => {
        const proxys = []
        for (let i of x) {
            const ip = i.querySelector('td:nth-child(2)').innerText
            const port = i.querySelector('td:nth-child(3)').innerText
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