/**
 * 秘密代理
 * http://www.mimiip.com/
 */
export default async function (page, fetch, saver) {
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
}