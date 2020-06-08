import Taro from '@tarojs/taro'
const ENV_TYPE = Taro.getEnv();
const {
  WEB,
  WEAPP
} = Taro.ENV_TYPE;

const formatTime = (date, isDate) => {
  if (!date) return '';
  if (typeof date == 'string') date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (isDate) return [year, month, day].map(formatNumber).join('/');
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  isWeb: ENV_TYPE === WEB,
  isWx: ENV_TYPE === WEAPP,
  isInWx: true,//typeof WeixinJSBridge !== 'undefined', // 测试期间直接返回true
  reLaunch({
    url
  }) {
    if (ENV_TYPE === WEAPP) return Taro.reLaunch({
      url
    });
    return Taro.redirectTo({
      url
    });
  },
  wxPay(wxJsApiParam) {
    return new Promise(resolve => {
      if (typeof wxJsApiParam === 'string') wxJsApiParam = JSON.parse(wxJsApiParam);
      WeixinJSBridge.invoke('getBrandWCPayRequest', wxJsApiParam, r => {
        return resolve(r.err_msg === 'get_brand_wcpay_request:ok');
      });
    })
  }
}
