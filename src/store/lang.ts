import { observable } from 'mobx'
import zh from '../utils/languages/zh'
import en from '../utils/languages/en'
import ja from '../utils/languages/ja'
import { getStorageByName, setStorageSync } from '../utils/stroage'

const langStore = observable({
  language: 'zh',
  languages: { zh, en, ja },
  langPackage (lang) {
    return this.languages[lang]
  },
  getByKey(key, lng) {
    if(!lng) {
      lng = this.language
    }
    let l = this.langPackage(lng); 
    if(!l) return '语言版本不存在';
    if(typeof key === 'string')
      return l[key] ? l[key] : '未设置语言';
  },
  getLng() {
    return this.language ? this.language : 'zh';
  },
  setLng(__lng) {
    this.language = __lng;
    setStorageSync('_lng_version_', __lng);
  },
})

export default langStore