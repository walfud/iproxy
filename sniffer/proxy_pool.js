/**
 * 某网友整理好的代理池
 * https://github.com/jhao104/proxy_pool
 */

import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

export default async function(saver) {
    for (let i = 0; i < 10; i++) {
        const proxy = await fetch('http://123.207.35.36:5010/get').then(res => res.text()).catch(() => {})
        saver(proxy)
    }
}