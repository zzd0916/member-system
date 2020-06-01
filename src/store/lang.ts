import { observable } from 'mobx'
import zh from '../utils/languages/zh'
import en from '../utils/languages/en'
import ja from '../utils/languages/ja'
import { getStorageByName, setStorageSync } from '../utils/stroage'

interface ILanguagesList {
  text:string;
  value: string;
}

export interface LangProps {
    activeLang: string;
    language: string;
    languages: object;
    langPackage: Function;
    getLng: Function;
    getByKey: Function;
    setLng: Function;
    languagesList: Array<ILanguagesList>;
}

const langStore = observable({
  language: getStorageByName('_lng_version_')? getStorageByName('_lng_version_'): 'zh',
  languages: { zh, en, ja },
  languagesList: [
    { text: '中文', value: 'zh',},
    { text: 'English', value: 'en' },
    { text: '日本語', value: 'ja' }
  ],
  activeLang: 'zh',
  langPackage () {
    return this.languages[this.language]
  },
  getByKey(key: string): string {
    let l = this.langPackage(); 
    if(!l) return '语言版本不存在';
    return l[key] ? l[key] : '未设置语言';
  },
  getLng() {
    return this.language ? this.language : 'zh';
  },
  setLng(__lng) {
    this.language = __lng;
    setStorageSync('_lng_version_', __lng);
  }
})

export default langStore