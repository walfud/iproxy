'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _puppeteer = require('puppeteer');var _puppeteer2 = _interopRequireDefault(_puppeteer);
var _nodeFetch = require('node-fetch');var _nodeFetch2 = _interopRequireDefault(_nodeFetch);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

async function (saver) {
    for (let i = 0; i < 10; i++) {
        const proxy = await (0, _nodeFetch2.default)('http://123.207.35.36:5010/get').then(res => res.text()).catch(() => {});
        saver(proxy);
    }
};
//# sourceMappingURL=proxy_pool.js.map