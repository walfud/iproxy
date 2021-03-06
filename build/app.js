'use strict';var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);
var _koaLogger = require('koa-logger');var _koaLogger2 = _interopRequireDefault(_koaLogger);
var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const proxys = [];

// Sniffer Service
// setInterval(function () {
function saver(where, proxy) {
    if (!Array.isArray(proxy)) {
        proxy = [proxy];
    }

    for (let i of proxy) {
        if (i && i.replace(/[^.]/g, '').length === 3 && i.replace(/[^:]/g, '').length === 1) {
            proxys.push(i);
            console.log(`${where} add: ${i}`);
        }
    }
}

// Refresh
proxys.splice(0);
for (let file of _fs2.default.readdirSync('./sniffer')) {
    console.log(`loading sniffer: ${file}`);

    const { name } = _path2.default.parse(file);
    (async function () {
        const browser = await _puppeteer2.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] });

        try {
            const page = await browser.newPage();
            await require(`./sniffer/${name}`).default(page, _nodeFetch2.default, proxy => saver(name, proxy));
        } catch (err) {
            console.log(err);
        } finally {
            browser && browser.close();
        }
    })();
}
// }, 1 * 1000);

// Server
const app = new _koa2.default();
app.use((0, _koaLogger2.default)());
app.use((0, _koaBodyparser2.default)());

const root = new _koaRouter2.default();
root.get('/', ctx => {
    ctx.body = proxys;
});
app.use(root.routes());

app.listen(3000);
console.log(`Listen at 3000`);
//# sourceMappingURL=app.js.map