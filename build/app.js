'use strict';var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);
var _koaLogger = require('koa-logger');var _koaLogger2 = _interopRequireDefault(_koaLogger);
var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

require('./sniffer/proxy-list').default(x => console.log(x));

// Sniffer Service
setInterval(function () {
    // TODO: mongodb
    const proxies = [];
    function saver(proxy) {
        if (!Array.isArray(proxy)) {
            proxy = [proxy];
        }

        for (let i of proxy) {
            if (i && i.replace(/[^.]/g, '').length === 3 && i.replace(/[^:]/g, '').length === 1) {
                proxies.push(i);
                console.log(`proxy added: ${i}`);
            }
        }
    }
    for (let file of _fs2.default.readdirSync('./sniffer')) {
        console.log(`loading sniffer: ${file}`);

        const { name } = _path2.default.parse(file);
        try {
            require(`./sniffer/${name}`).default(saver);
        } catch (err) {
            console.log(err);
        }
    }
}, 60 * 60 * 1000);

// Server
const app = new _koa2.default();
app.use((0, _koaLogger2.default)());
app.use((0, _koaBodyparser2.default)());

const root = new _koaRouter2.default();
root.get('/', ctx => {
    ctx.body = 'Hello World';
});

// Load all routers
for (let file of _fs2.default.readdirSync('./router')) {
    console.log(`loading module: ${file}`);

    const { name } = _path2.default.parse(file);
    root.use(`/${name}`, require(`./router/${name}`).default.routes());
}
app.use(root.routes());

app.listen(3000);
console.log(`Listen at 3000`);
//# sourceMappingURL=app.js.map