'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 快代理
                                                                             * https://www.kuaidaili.com/free/
                                                                             */exports.default =
async function (page, fetch, saver) {
    await page.goto('https://www.kuaidaili.com/free/');
    await page.waitForSelector('#list > table > tbody');
    const proxys = await page.$$eval('#list > table > tbody > tr', x => {
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
//# sourceMappingURL=kuaidaili.js.map