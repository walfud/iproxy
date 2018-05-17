'use strict';Object.defineProperty(exports, "__esModule", { value: true }); /**
                                                                             * 站大爷
                                                                             * 支持 https
                                                                             * 支持 post响应时间 < 1s
                                                                             * 
                                                                             * http://ip.zdaye.com/FreeIPlist.html?ip=&adr=&checktime=&sleep=1&cunhuo=&nadr=&dengji=&https=1&yys=&post=%D6%A7%B3%D6&px=
                                                                             */exports.default =
async function (page, fetch, saver) {
    ////////////////////////////
    return;
    ////////////////////////////

    await page.goto('http://ip.zdaye.com/FreeIPlist.html?ip=&adr=&checktime=&sleep=1&cunhuo=&nadr=&dengji=&https=1&yys=&post=%D6%A7%B3%D6&px=');

    await page.waitForSelector('#ipc');
    const ipPortUrls = await page.$eval('#ipc', async () => {
        const ipPortUrls = [];
        const trs = document.querySelectorAll('#ipc > tbody tr:not(.active)');
        for (let i = 0; i < trs.length; i++) {
            const tr = trs[i];
            const ip = tr.querySelector('td:first-child').innerText;
            const portUrl = tr.querySelector('td:nth-child(3) > img').src;
            ipPortUrls.push({
                ip,
                portUrl });

        }
        return ipPortUrls;
    });
    const cookies = await page.cookies();
    for (let ipPortUrl of ipPortUrls) {
        const portPicBuffer = await fetch(ipPortUrl.portUrl, {
            follow: 200,
            headers: {
                Host: 'ip.zdaye.com',
                Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                Referer: 'http://ip.zdaye.com/FreeIPlist.html?ip=&adr=&checktime=&sleep=3&cunhuo=&nadr=&dengji=&https=1&yys=&post=%D6%A7%B3%D6&px=',
                Cookie: cookies.map(x => `${x.name}=${x.value}`).join(';') } }).


        then(res => res.buffer());
        // TODO: verification code recognition

        saver(`${ipPortUrl.ip}:???`);
    }
};
//# sourceMappingURL=zdaye.js.map