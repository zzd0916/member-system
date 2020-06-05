import { ComponentType } from 'react'
import Taro, { Component, Config, getStorage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton, AtAvatar } from 'taro-ui'
import { config, toast, auth, util } from '@utils'
import { getStorageByName, setStorageSync } from '@utils/stroage'
import { login, sendPhoneCode, ILogin, sendCodeProps } from '@api/loginApi'
import { LangProps } from '@store/lang.ts'
import { ChooseLanguage } from '@components'

import './login.scss'

interface IProps {
  props: {
    langStore: ILogin
  };
}

export interface IState {
  phone: string;
  code: string;
  countDown: any;
  isSend: boolean;
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

  state: IState = {
    phone: '',
    code: '',
    countDown: 60,
    isSend: false,
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
    clearInterval(this.IV); //可以停止
  
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
    const { phone, code } = this.state
    this.checkParams()
    toast.showLoading(`${loginTitle}...`);
    if (this.checkParams()) {
      let params: ILogin = {
        phone,
        code
      }
      login(params).then((res) => {
        if (res.success && res.data._id) {
          auth.setLogin(res.data);
          if(res.token) {
            setStorageSync("token", res.token)
          }
          Taro.reLaunch({
            url: '/pages/home/home'
          })
        } else {
          let errMsg = res.errMsg || res.err_msg
          toast.alert({
            title: '登陆失败',
            msg: errMsg || '意外的错误'
          })
        }
      }).catch(e => {
        let errMsg = e.errMsg || e.err_msg
        toast.alert({
          title: '出了点意外',
          msg: errMsg || '意外的错误'
        })
      }).finally(e => {
        toast.hideLoading()
      })
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
    if (!phone) {
      toast.toast('手机号不能为空')
      return false

    }
    if (phone.length < 7) {
      toast.toast('手机号格式不正确')
      return false

    }
    return true
  }
  /**
   * 验证code是否为空
  */
  checkCode() {
    const { code } = this.state
    if (!code) {
      toast.toast('验证码不能为空')
      return false
    }
    if (code.length < 4) {
      toast.toast('验证码长度不正确')
      return false
    }
    return true
  }

  back() {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  sendCode(e) {
    e.preventDefault();
    let flag = this.checkPhone();
    console.log('flag', flag)
    if (flag) {
      let { countDown, phone } = this.state;
      const { langStore } = this.props
      console.log("sendCode")
      sendPhoneCode({ phone, __lng: langStore.getLng()})
        .then(ret => {
          if (ret.success) {
            this.setState({
              isSend: true
            })
            let countDown = 60
            setStorageSync('lastGetPhoneCode', new Date());
            this.IV  = setInterval(() => {
              console.log("setInterval", countDown)
              countDown -= 1
              this.setState({ countDown });
              if (countDown <= 0) {
                this.setState({
                  isSend: false,
                  countDown: 60
                })
                return clearInterval(this.IV);
              }
            }, 1000)
          }
        })
      
    }
  }

  goToRegisterPage() {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }
  render() {
    const { langStore } = this.props;
    const { isSend, countDown } = this.state;
    const title = langStore.getByKey('title')
    const slogon = langStore.getByKey('member') + langStore.getByKey('login')
    const phoneTitle = langStore.getByKey('phone')
    const codeTitle = langStore.getByKey('validCode')
    const loginTitle = langStore.getByKey('login')
    const isAllowReg = config.allowReg();
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
            {
              isSend === true ? <AtButton customStyle='width: 90px;'>{countDown}s</AtButton> : <AtButton  customStyle='width: 90px;' onClick={this.sendCode.bind(this)}>{codeTitle}</AtButton>
            }
             
            </AtInput>
          </View>
          <View className='form-item'>
            <AtButton onClick={this.onLogin.bind(this)} type='primary' >{loginTitle}</AtButton>
            {isAllowReg == true ? <AtButton onClick={this.goToRegisterPage.bind(this)}>注册</AtButton> : null}
          </View>
        </AtForm>
        <ChooseLanguage />
      </View>
    )
  }
}

export default Login as ComponentType
