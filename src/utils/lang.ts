import zh from './languages/zh'
import en from './languages/en'
import ja from './languages/ja'
import { getStorageByName } from '../utils/stroage'

const lang = { zh, en, ja };

export default {
  getValByName(key) {
    let lng = this.getLng();
    let l = lang[lng]
    if(!l) return '语言版本不存在';
    return l[key] ? l[key] : '未设置语言';
  },
  getLng() {
    let lng = getStorageByName('_lng_version_');
    return lng ? lng : 'zh';
  }
}
