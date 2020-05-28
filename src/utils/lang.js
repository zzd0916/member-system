import zh from './languages/zh'
import en from './languages/en'
import ja from './languages/ja'
import Taro from '@tarojs/taro'
import {util, config, stroage } from '@utils'
import { http } from './http'
import { getStorageByName, setStorageSync } from './stroage'

const lang = { zh, en, ja };

export default {
  get(key, lng) {
    if (!lng) lng = this.getLng();
    let l = lang[lng];
    if(!l) return '语言版本不存在';
    if(typeof key === 'string')
      return l[key] ? l[key] : '未设置语言';

    const s = [];
    key.forEach(k => {
      s.push(l[k] ? l[k] : '#ERROR#');
    });
    console.log(s.join(''))
    return s.join('');
  },
  getLng() {
    let lng = getStorageByName('_lng_version_');
    if(!lng){
      const { language } = Taro.getSystemInfoSync();
      console.log( language )
      lng = language.split('-')[0];
      setStorageSync('_lng_version_', lng);
    }
    return lng ? lng : 'zh';
  },
  setLng(__lng) {
    setStorageSync('_lng_version_', __lng);
    // 每次切换语言需要重新获取配置参数
    // console.log(http)
    // const { data } = await http.get('/config', { __lng });
    // setStorageSync('config', data);
    location.reload();
  },
}
