'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 66 免费代理
                                                                             * http://www.66ip.cn/index.html
                                                                             */exports.default =
async function (page, fetch, saver) {
    await page.goto('http://www.66ip.cn/index.html');
    await page.waitForSelector('#main > div > div:nth-child(1) > table > tbody');
    const proxys = await page.$$eval('#main > div > div:nth-child(1) > table > tbody > tr:not(:nth-child(1))', x => {
        const proxys = [];
        for (let i of x) {
            const ip = i.querySelector('td:nth-child(1)').innerText;
            const port = i.querySelector('td:nth-child(2)').innerText;
            proxys.push({
                ip,
                port });

        }

        return proxys;
    });

    for (let proxy of proxys) {
        saver(`${proxy.ip}:${proxy.port}`);
    }
};
//# sourceMappingURL=66ip.js.map