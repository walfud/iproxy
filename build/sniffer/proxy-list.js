'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * Proxy List
                                                                             * http://proxy-list.org
                                                                             */exports.default =
async function (page, fetch, saver) {
    await page.goto('http://proxy-list.org');
    await page.waitForSelector('div.table-wrap > div > ul > li.proxy');
    const proxys = await page.$$eval('div.table-wrap > div > ul > li.proxy', x => x.map(y => y.innerText));

    for (let proxy of proxys) {
        saver(proxy);
    }
};
//# sourceMappingURL=proxy-list.js.map