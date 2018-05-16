/**
 * Proxy List
 * http://proxy-list.org
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
    await page.goto('http://proxy-list.org')
    await page.waitForSelector('div.table-wrap > div > ul > li.proxy')
    const proxys = await page.$$eval('div.table-wrap > div > ul > li.proxy', x => x.map(y => y.innerText))

    for (let proxy of proxys) {
        saver(proxy)
    }

    await browser.close()
}