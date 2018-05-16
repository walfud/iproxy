'use strict';Object.defineProperty(exports, "__esModule", { value: true });




var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 秘密代理
                                                                                                                                                                                           * http://www.mimiip.com/
                                                                                                                                                                                           */exports.default = async function (saver) {const browser = await _puppeteer2.default.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });


    // Goto share
    const page = await browser.newPage();
    await page.goto('http://www.mimiip.com/');
    await page.waitForSelector('.list');
    const proxys = await page.$$eval('.list', x => {
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

    await browser.close();
};
//# sourceMappingURL=mimiip.js.map