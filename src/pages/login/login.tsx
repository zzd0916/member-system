import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Form, Button, Text, Image, Picker } from '@tarojs/components'
import { AtInput, AtButton, AtDivider } from 'taro-ui'

import './login.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  loginType?: string
}

interface Login {
  props: PageStateProps;
}

@inject('loginStore')
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

  componentWillMount () { 
    console.log('login componentWillMount')
  }

  componentWillReact () {
    console.log('login componentWillReact')
  }

  componentDidMount () { 
    console.log('login componentDidMount')
  }

  componentWillUnmount () { 
    console.log('login componentWillUnmount')
  }

  componentDidShow () { 
    console.log('login componentDidShow')
  }

  componentDidHide () { 
    console.log('login componentDidHide')
  }


  back() {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  render () {
    const { countDown, form, disType, lang, countries, country } = this.state;
    const config = cfg.get('config');
  
    return (
      <View className='block'>
        {!config ? null : <View style={{ textAlign:'center', fontSize: 24 }}>
          {!config.logo ? null : <Image mode="aspectFit" style='height: 80px;background: #fff;' src={config.logo} />}
          {!config.title ? null : <View>{ config.title }</View>}
        </View>}
        <AtDivider content={ disType === 'pwdLogin' ? '密码登录' : disType === 'reg' ? '注册新账号' : lng.get(['member','login']) } fontColor='#2d8cf0' lineColor='#2d8cf0' />
  
        { disType !== 'reg' ? null : <AtInput name='realName' title='姓名' type='text' maxLength='3' placeholder='姓名' value={form.realName} onChange={ realName => this.setValue({ realName }) } />}
  
        <AtInput ref={ d => this.p = d } name='phone' title={lng.get('phone')} type='text' maxLength='15' placeholder={lng.get('phone')} value={form.phone} onChange={ phone => this.setValue({ phone }) }>
          <Picker mode='selector' rangeKey="name" range={ countries } onChange={({ detail: { value } }) => this.setState({ country: value })}>
            <View className='picker'>
              { countries[country].name }
            </View>
          </Picker>
        </AtInput>
  
        {
          disType === 'pwdLogin' ? null :
          <AtInput name='phonecode' title={lng.get('validCode')} type='text' maxLength='6' placeholder={lng.get('validCode')} value={form.phonecode} onChange={ phonecode => this.setValue({ phonecode }) }>
            { disType === 'pwdLogin' ? null : countDown && countDown > 0 ? `${countDown} ${lng.get('tryLater')}` : <AtButton size='small' onClick={ _ => this.onCode() }>{lng.get('validCode')}</AtButton>}
          </AtInput>
        }
        {
          disType === 'phoneLogin' ? null :
          <AtInput name='pwd' title='密码' type='password' maxLength='16' placeholder='密码' value={form.pwd} onChange={ pwd => this.setValue({ pwd }) } />
        }
  
        <Button onClick={ _ => this.onLogin() } className='at-button at-button--normal at-button--primary'>{lng.get('submit')}</Button>
  
        <View className='at-row margin-h' style='display:none'>
          <View className='at-col at-col-6'>
            <Text onClick={ _ => this.setState({ disType: disType === 'pwdLogin' ? 'phoneLogin' : 'pwdLogin' }) }>{ disType === 'pwdLogin' ? '手机号码登录' : '密码登录' }</Text>
          </View>
          { !cfg.allowReg ? null : <View className='at-col at-col-6' style='text-align:right;'>
            <Text onClick={ _ => this.setState({ disType: 'reg' }) }>注册新账号</Text>
          </View>}
        </View>
        <View className='at-row at-row__justify--around' style='margin-top:20px;text-align:center'>
          <View className='at-col' onClick={ _ => this.setLng('zh') } style={{ borderBottom: lang==='zh'?'solid #6392E5 1px':'0' }}>
            中文
          </View>
          <View className='at-col' onClick={ _ => this.setLng('en') } style={{ borderBottom: lang==='en'?'solid #6392E5 1px':'0' }}>
            English
          </View>
          <View className='at-col' onClick={ _ => this.setLng('ja') } style={{ borderBottom: lang==='ja'?'solid #6392E5 1px':'0' }}>
            日本語
          </View>
        </View>
      </View>
      )
    }
}

export default Login  as ComponentType
