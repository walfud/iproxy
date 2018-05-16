'use strict';Object.defineProperty(exports, "__esModule", { value: true });




var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 无忧代理
                                                                                                                                                                                           * http://www.data5u.com/free/index.shtml
                                                                                                                                                                                           */exports.default = async function (saver) {const browser = await _puppeteer2.default.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });


    // Goto share
    const page = await browser.newPage();
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

    await browser.close();
};
//# sourceMappingURL=data5u.js.map