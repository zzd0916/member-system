import { observable } from 'mobx'

const loginStore = observable({
  form: {
    username: '',
    password: '',
    phone: '',
    code: ''
  },
  languages: [
    { text: '中文', value: 'zh',},
    { text: 'English', value: 'en' },
    { text: '日本語', value: 'ja' }
    
  ],
  activeLang: 'zh',
  changeForm(form) {
    this.form = form;
  }
})
export default loginStore