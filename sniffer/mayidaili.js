/**
 * 蚂蚁代理
 * http://www.mayidaili.com/share/
 */

import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

export default async function (saver) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('http://ip.zdaye.com/FreeIPlist.html?ip=&adr=&checktime=&sleep=1&cunhuo=&nadr=&dengji=&https=1&yys=&post=%D6%A7%B3%D6&px=')

    await page.waitForSelector('.bs-callout.bs-callout-info:nth-child(1) a')
    const ipPortUrls = await page.$eval('.bs-callout.bs-callout-info:nth-child(1) a', async a => {

    })
    const cookies = await page.cookies()
    for (let ipPortUrl of ipPortUrls) {        
        const portPicBuffer = await fetch(ipPortUrl.portUrl, {
            follow: 200,
            headers: {
                Host: 'ip.zdaye.com',
                Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                Referer: 'http://ip.zdaye.com/FreeIPlist.html?ip=&adr=&checktime=&sleep=3&cunhuo=&nadr=&dengji=&https=1&yys=&post=%D6%A7%B3%D6&px=',
                Cookie: cookies.map(x => `${x.name}=${x.value}`).join(';'),
            }
        })
        .then(res => res.buffer())
        // TODO: verification code recognition

        saver(`${ipPortUrl.ip}:???`)
    }

    await browser.close()
}