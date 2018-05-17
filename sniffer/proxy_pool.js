/**
 * 某网友整理好的代理池
 * https://github.com/jhao104/proxy_pool
 */
export default async function (page, fetch, saver) {
    for (let i = 0; i < 10; i++) {
        const proxy = await fetch('http://123.207.35.36:5010/get').then(res => res.text())
        saver(proxy)
    }
}