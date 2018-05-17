/**
 * 蚂蚁代理
 * http://www.mayidaili.com/share/
 */
export default async function (page, fetch, saver) {
    await page.goto('http://www.mayidaili.com/share/')
    await page.waitForSelector('.bs-callout.bs-callout-info:nth-child(1)')
    const url = await page.$eval('.bs-callout.bs-callout-info:nth-child(1) a', x => x.href)

    // Goto detail
    await page.goto(url)
    await page.waitForSelector('body > div:nth-child(4) > p')
    const proxyStr = await page.$eval('body > div:nth-child(4) > p', x => x.innerText)
    proxyStr.split("\n")
        .filter(x => !!x)
        .map(x => x.replace(/#.*$/, ''))
        .forEach(x => saver(x))
}