import { ComponentType } from 'react'
import Taro, { Component, Config, getStorage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton, AtAvatar } from 'taro-ui'
import { config, toast, auth, util } from '@utils'
import { getStorageByName, setStorageSync } from '@utils/stroage'
import { login, sendCode, loginProps, sendCodeProps } from '@api/loginApi'
import { LangProps } from '@store/lang.ts'
import { ChooseLanguage } from '@components'

import './login.scss'

interface IProps {
  props: {
    langStore: LangProps
  };
}

export interface IState {
  phone: string;
  code: string;
}

@inject('langStore')
@observer
class Login extends Component<IProps, IState> {

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

  static defaultProps = {
    phone: null,
    code: null,
  }

  componentWillMount() {
    // console.log('login componentWillMount')
  }

  componentWillReact() {
    // console.log('login componentWillReact')
  }

  componentDidMount() {
    // console.log('login componentDidMount')
  }

  componentWillUnmount() {
    // console.log('login componentWillUnmount')
  }

  componentDidShow() {
    // console.log('login componentDidShow')
  }

  componentDidHide() {
    // console.log('login componentDidHide')
  }

  handlePhoneChange(e) {
    this.setState({
      phone: e
    })
    // return e.target.value
  }
  handleCodeChange(e) {
    this.setState({
      code: e
    })
    // return e.target.value
  }
  onLogin() {
    const { langStore } = this.props
    const loginTitle = langStore.getByKey('login')
    this.checkParams()
    toast.showLoading(`${loginTitle}...`);
    if (this.checkParams()) {
      let params: loginProps = {
        phone: this.state.phone,
        code: this.state.code
      }
      let data = {
        _id: '000001',
        phone: '15680686538'
      }
      auth.setLogin(data);
      // const url = getStorageByName('_login_src') ? setStorageSync('_login_src') : '/pages/home/home'
      const url = '/pages/home/home'
      // setStorageSync('_login_src', null)
      util.reLaunch({
        url
      });
    
      // login(params).then( (res)=> {
      //   console.log(res)
      //   Taro.reLaunch({
      //     url: '/pages/home/home'
      //   })
      // }).catch( e => {
      //   toast.alert({
      //     title: '登陆失败',
      //     msg: e.msg || e.message
      //   })
      // }).finally (e => {
      //   toast.hideLoading()
      // })

    }
  }
  /**
   * 检查参数是否合法
   */
  checkParams(): boolean | undefined {
    return (this.checkPhone() && this.checkCode());
  }
  /**
   * 验证手机号格式
  */
  checkPhone() {
    const { phone } = this.state
    let flag = true
    if (!phone) {
      toast.toast('手机号不能为空')
      flag = false
      return
    }
    if (phone.length < 7) {
      toast.toast('手机号格式不正确')
      flag = false
      return
    }
    return flag
  }
  /**
   * 验证code是否为空
  */
  checkCode() {
    const { code } = this.state
    let flag = true;
    if (!code) {
      toast.toast('验证码不能为空')
      flag = false
      return
    }
    if (code.length < 4) {
      toast.toast('验证码长度不正确')
      flag = false
      return
    }
    return flag
  }

  back() {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  sendCode(e) {
    e.preventDefault();
    this.checkPhone();
    console.log("sendcode")
  }
  goToRegisterPage() {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }
  render() {
    const { langStore } = this.props;
    const title = langStore.getByKey('title')
    const slogon = langStore.getByKey('member') + langStore.getByKey('login')
    const phoneTitle = langStore.getByKey('phone')
    const codeTitle = langStore.getByKey('validCode')
    const loginTitle = langStore.getByKey('login')

    return (
      <View className='login'>
        <View className='login-title'>
          <AtAvatar image='http://holomotion.ntsports.tech/img/logo.png' size={'large'}></AtAvatar>
          <View>{title}</View>
        </View>
        <View>
          <View className="at-divider">
            <View className="at-divider__content" style="color: rgb(45, 140, 240);">{slogon}</View>
            <View className="at-divider__line" style="background-color: rgb(45, 140, 240);"></View>
          </View>
        </View>
        <AtForm
        >
          <View className='form-item'>
            <AtInput
              name='phone'
              title={phoneTitle}
              type='phone'
              placeholder={phoneTitle}
              value={this.state.phone}
              focus
              onChange={this.handlePhoneChange.bind(this)}
            />
          </View>
          <View className='form-item'>
            <AtInput
              name='value'
              title={codeTitle}
              type='number'
              placeholder={codeTitle}
              value={this.state.code}
              maxLength={6}
              onChange={this.handleCodeChange.bind(this)}
            >
              <AtButton onClick={this.sendCode.bind(this)}>{codeTitle} </AtButton>
            </AtInput>
          </View>
          <View className='form-item'>
            <AtButton onClick={this.onLogin.bind(this)} type='primary' >{loginTitle}</AtButton>
            {config.allowReg == true ? <AtButton onClick={this.goToRegisterPage.bind(this)}>注册</AtButton> : null}
          </View>
        </AtForm>
        <ChooseLanguage />
      </View>
    )
  }
}

export default Login as ComponentType
