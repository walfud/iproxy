'use strict';Object.defineProperty(exports, "__esModule", { value: true });




var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                           * 蚂蚁代理
                                                                                                                                                                                           * http://www.mayidaili.com/share/
                                                                                                                                                                                           */exports.default = async function (saver) {const browser = await _puppeteer2.default.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });


    // Goto share
    const page = await browser.newPage();
    await page.goto('http://www.mayidaili.com/share/');
    await page.waitForSelector('.bs-callout.bs-callout-info:nth-child(1)');
    const url = await page.$eval('.bs-callout.bs-callout-info:nth-child(1) a', x => x.href);

    // Goto detail
    await page.goto(url);
    await page.waitForSelector('body > div:nth-child(4) > p');
    const proxyStr = await page.$eval('body > div:nth-child(4) > p', x => x.innerText);
    proxyStr.split("\n").
    filter(x => !!x).
    map(x => x.replace(/#.*$/, '')).
    forEach(x => saver(x));

    await browser.close();
};
//# sourceMappingURL=mayidaili.js.map