import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton, AtAvatar } from 'taro-ui'
import { http, config } from '@utils'
import { login, sendCode, loginProps, sendCodeProps } from '@api/loginApi'

import './login.scss'
import { toast } from '@utils'

type PageStateProps = {
  loginStore: {
    form: Object,
    languages:Array<any>,
    activeLang: string,
    changeForm: Function
  },
  langStore: {
    language: string,
    languages: object,
    langPackage: Function,
    getLng: Function,
    setLng: Function
  }
}

interface Login {
  props: PageStateProps;
}

@inject('loginStore','langStore')
@observer
class Login extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登陆页面',
    navigationBarBackgroundColor: '#000'
  }

  constructor () {
    super(...arguments)
    this.state = {
      phone: '',
      code: '',
    }
    this.sendCode.bind(this)
  }

  componentWillMount () { 
    // console.log('login componentWillMount')
  }

  componentWillReact () {
    // console.log('login componentWillReact')
  }

  componentDidMount () { 
    // console.log('login componentDidMount')
  }

  componentWillUnmount () { 
    // console.log('login componentWillUnmount')
  }

  componentDidShow () { 
    // console.log('login componentDidShow')
  }

  componentDidHide () { 
    console.log('login componentDidHide')
  //   this.setState = ({
  //     phone: '',
  //     code: ''
  //   }, function() {
  //     console.log(this.state)
  //   })
  }

  handlePhoneChange (e) {
    this.setState({
      phone: e
    })
    // return e.target.value
  }
  handleCodeChange (e) {
    this.setState({
      code: e
    })
    // return e.target.value
  }
  onLogin (event) {
    this.checkParams()
    if(this.checkParams()) {
      let params:loginProps = {
        phone: this.state.phone,
        code: this.state.code
      }
      const data = login(params).then( (res)=> {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      });
      
    }
  }
  /**
   * 检查参数是否合法
   */
  checkParams(): boolean {
    const { phone, code } = this.state;
   
    let flag:boolean = true;
    checkPhone() && checkCode();
    return flag

     /**
     * 验证手机号格式
    */
    function checkPhone() {
      if(!phone) {
        toast.toast('手机号不能为空')
        flag = false
        return
      }
      return flag
    }
    /**
     * 验证code是否为空
    */
    function checkCode() {
      if(!code) {
        toast.toast('验证码不能为空')
        flag = false
        return
      }
      if(code.length<3) {
        toast.toast('验证码长度不正确')
        flag = false
        return
      }
    }
  }
  

  back() {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  goToPage(){

  }
  setLang(val:string) {
    const { langStore } = this.props
    langStore.setLng(val)
  }
  sendCode (e) {
    e.preventDefault();
  }
  goToRegisterPage() {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }
  render () {
    const {loginStore, langStore } = this.props;
    return (
        <View className='login'>
          <View className='login-title'>
            <AtAvatar image='http://holomotion.ntsports.tech/img/logo.png' size={'large'}></AtAvatar>
            <View>{langStore.getByKey('title')}</View>
          </View>
          <View>
          <div class="at-divider" style=""><div class="at-divider__content" style="color: rgb(45, 140, 240);">会員様登録</div><div class="at-divider__line" style="background-color: rgb(45, 140, 240);"></div></div>
          </View>
          <AtForm
          >
          <View className='form-item'>
            <AtInput 
              name='phone' 
              title={langStore.getByKey('phone')} 
              type='phone' 
              placeholder={langStore.getByKey('phone')} 
              value={this.state.phone}
              focus
              onChange={this.handlePhoneChange.bind(this)} 
            />
          </View>
          <View className='form-item'>
            <AtInput 
              name='value' 
              title={langStore.getByKey('validCode')} 
              type='number' 
              placeholder={langStore.getByKey('validCode')} 
              value={this.state.code} 
              maxLength={6}
              onChange={this.handleCodeChange.bind(this)} 
            >
            <AtButton onClick = {this.sendCode}>{langStore.getByKey('validCode')} </AtButton>
            </AtInput>
          </View>
          <View className='form-item'>
            <AtButton onClick={this.onLogin.bind(this)} type='primary' >{ langStore.getByKey('login')}</AtButton>
            { config.allowReg == true ? <AtButton onClick={this.goToRegisterPage.bind(this)}>注册</AtButton> : null }
          </View>
        </AtForm>
        <View className='at-row at-row__justify--around' style='margin-top:20px;text-align:center'>
          {
            loginStore.languages.map( (item ) => {
              let cName = item.value ===  langStore.getLng() ? 'at-col language-active' : 'at-col';
              return (
                <View className={cName} onClick={this.setLang.bind(this,item.value)} >
                {item.text}
              </View>
              )
            })
          }
        </View>
      </View>
      )
    }
}

export default Login  as ComponentType
