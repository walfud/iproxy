'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 某网友整理好的代理池
                                                                             * https://github.com/jhao104/proxy_pool
                                                                             */exports.default =
async function (page, fetch, saver) {
    for (let i = 0; i < 10; i++) {
        const proxy = await fetch('http://123.207.35.36:5010/get').then(res => res.text());
        saver(proxy);
    }
};
//# sourceMappingURL=proxy_pool.js.map