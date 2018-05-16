'use strict';Object.defineProperty(exports, "__esModule", { value: true });




var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * Proxy List
                                                                                                                                                                                           * http://proxy-list.org
                                                                                                                                                                                           */exports.default = async function (saver) {const browser = await _puppeteer2.default.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });


    // Goto share
    const page = await browser.newPage();
    await page.goto('http://proxy-list.org');
    await page.waitForSelector('div.table-wrap > div > ul > li.proxy');
    const proxys = await page.$$eval('div.table-wrap > div > ul > li.proxy', x => x.map(y => y.innerText));

    for (let proxy of proxys) {
        saver(proxy);
    }

    await browser.close();
};
//# sourceMappingURL=proxy-list.js.map