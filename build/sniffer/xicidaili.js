'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 西刺代理
                                                                             * http://www.xicidaili.com/
                                                                             */exports.default =
async function (page, fetch, saver) {
    await page.goto('http://www.xicidaili.com/');
    await page.waitForSelector('#ip_list > tbody > tr.odd');
    const proxys = await page.$$eval('#ip_list > tbody > tr.odd', x => {
        const proxys = [];
        for (let i of x) {
            const ip = i.querySelector('td:nth-child(2)').innerText;
            const port = i.querySelector('td:nth-child(3)').innerText;
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
//# sourceMappingURL=xicidaili.js.map