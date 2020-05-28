import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton } from 'taro-ui'

import './login.scss'

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
  },
  loginType?: string
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
    navigationBarTitleText: '登陆页面'
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
    // console.log('login componentDidHide')
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
    console.log(this.state)
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
    console.log("sendCode")
  }
  goToRegisterPage() {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }
  render () {
    const {loginStore } = this.props;
    const {langStore } = this.props;
    return (
        <View className='login'>
          <View className='login-title'>
            <Text>{langStore.getByKey('member')+ `${langStore.getLng() === 'en' ? ' ' : ''}` +langStore.getByKey('login')}</Text>
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
            <AtButton onClick={this.onLogin.bind(this)} >{ langStore.getByKey('login')}</AtButton>
            <AtButton onClick={this.goToRegisterPage.bind(this)}>注册</AtButton>
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
