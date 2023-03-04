// 以环境变量的形式传入
const AppSecret = '0ed6397b2c0aa24f4074f23315b3428a'
const AppID = 'wx2036d9e2c0041a2e'

const axios = require('axios')


// code只显示5分钟有效
async function getOpenIDfromWechat(code = '0230gT0004tGxP1bES100H5lnF10gT02') {
    // TODO: 验证
    const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid: AppID,
            secret: AppSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    })
    return res.data;
}

getOpenIDfromWechat();

module.exports = {
    getOpenIDfromWechat
}