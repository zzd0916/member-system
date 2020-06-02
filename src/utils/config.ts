import Taro from '@tarojs/taro'
import { getStorageByName, setStorageSync} from '@utils/stroage'

const ENV_TYPE = Taro.getEnv();
const {
  WEB,
  WEAPP
} = Taro.ENV_TYPE;

// 获取是否允许注册
const getIsAllowReg = () : boolean => (!!getStorageByName('is_allow_reg'))

const setIsAllowReg = (flag:boolean) : void => {
  setStorageSync('is_allow_reg',flag)
}

export default {
  imgBaseUrl: '',
  baseUrl: '',
  allowReg: () => {
    return getIsAllowReg();
  }, // 是否允许注册
  setIsAllowReg,
  tel: null,
  isWeb: ENV_TYPE === WEB,
  isWx: ENV_TYPE === WEAPP,
  isInWx: true,//typeof WeixinJSBridge !== 'undefined', // 测试期间直接返回true
}
