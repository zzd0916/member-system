import Taro from '@tarojs/taro'
const ENV_TYPE = Taro.getEnv();
const {
  WEB,
  WEAPP
} = Taro.ENV_TYPE;

export default {
  imgBaseUrl: '',
  baseUrl: '',
  allowReg: false, // 是否允许注册
  tel: null,
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
}
