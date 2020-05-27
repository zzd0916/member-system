import { observable } from 'mobx'

const loginStore = observable({
  form: {
    username: '',
    password: '',
    phone: '',
    code: ''
  },
  changeForm(form) {
    this.form = form;
  }
})
export default loginStore