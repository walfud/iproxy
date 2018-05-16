'use strict';Object.defineProperty(exports, "__esModule", { value: true });




var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 西刺代理
                                                                                                                                                                                           * http://www.xicidaili.com/
                                                                                                                                                                                           */exports.default = async function (saver) {const browser = await _puppeteer2.default.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });


    // Goto share
    const page = await browser.newPage();
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

    await browser.close();
};
//# sourceMappingURL=xicidaili.js.map