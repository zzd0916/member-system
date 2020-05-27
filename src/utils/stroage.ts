import Taro from '@tarojs/taro'

export const getStorageByName  =  (name) => {
  return Taro.getStorageSync(name)
}
export const setStorageSync = (name, value) => {
  Taro.setStorageSync(name, value); 
}
export const removeStorageSync = (key) => {
  Taro.removeStorageSync(key)
}
export const getStorageInfo = () => {
  return Taro.getStorageInfoSync()
}