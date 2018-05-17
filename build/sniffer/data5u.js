'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 无忧代理
                                                                             * http://www.data5u.com/free/index.shtml
                                                                             */exports.default =
async function (page, fetch, saver) {
    await page.goto('http://www.data5u.com/free/index.shtml');
    await page.waitForSelector('body > div:nth-child(7) > ul > li:nth-child(2) > ul:not(:nth-child(1))');
    const proxys = await page.$$eval('body > div:nth-child(7) > ul > li:nth-child(2) > ul:not(:nth-child(1))', x => {
        const proxys = [];
        for (let i of x) {
            const ip = i.querySelector('span:nth-child(1) > li').innerText;
            const port = i.querySelector('span:nth-child(2) > li').innerText;
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
//# sourceMappingURL=data5u.js.map