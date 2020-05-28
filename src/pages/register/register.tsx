import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Radio   } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtRadio } from 'taro-ui'
// import {  auth, lang } from '@utils'
// import {  auth, lang, http } from '../../utils'

import './register.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  RegisterStore: {
    form: Object,
    activeLang: string,
    changeForm: Function
  },
  RegisterType?: string
}

interface Register {
  props: PageStateProps;
}

class Register extends Component {

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
      name: '',
      idCard:''
      phone: '',
      code: '',
      sexArray: [
        {value: 'man', name: '男'},
        {value: 'woman', name: '女'},
      ],
      sex: 'man',
      selector: ['新清泰克', '智能健身房', '巴西', '日本'],
      selectorChecked: '美国',
      timeSel: '12:01',
      dateSel: '2018-04-22'
    }
  }

  componentWillMount () { 
  }

  componentWillReact () {
  }

  componentDidMount () { 
  }

  componentWillUnmount () { 
  }

  componentDidShow () { 
  }

  componentDidHide () { 
  }
  handleNameChange(e) {
    this.setState({
      name: e
    })
  }
  handleIdcardChange(e) {
    this.setState({
      idCard: e
    })
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
  onSubmit (event) {
    console.log(this.state)
  }
  back() {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }
  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }
  render () {
    // const {RegisterStore } = this.props;
    return (
        <View className='register'>
          <View className='register-title'>
            <Text>用户注册</Text>
          </View>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
          <View className='form-item'>
            <AtInput 
              name='name' 
              title='姓名'
              type='text' 
              placeholder='请输入姓名' 
              value={this.state.name} 
              onChange={this.handleNameChange.bind(this)} 
            />
          </View>
          <View className='form-item'>
            <AtInput 
              name='idCard' 
              title='身份证' 
              type='idcard' 
              placeholder='请输入身份证'
              value={this.state.idCard} 
              maxLength={18}
              onChange={this.handleIdcardChange.bind(this)} 
            >
            </AtInput>
          </View>
          <View className='form-item'>
            <AtInput 
              name='phopne' 
              title='手机号'
              type='phone' 
              placeholder='请输入手机号'
              value={this.state.phone} 
              onChange={this.handlePhoneChange.bind(this)} 
            />
          </View>
          <View className='form-item'>
            <View>
              <Picker mode='date' onChange={this.onDateChange}>
                <AtList>
                  <AtListItem title='请选择生日' extraText={this.state.dateSel} />
                </AtList>
              </Picker>
            </View>
          </View>
          <View className='form-item'>
            {
              this.state.sexArray.map (item => {
                return <Radio value={item.value} checked={item.value === this.state.sex ? true: false }>{item.name}</Radio>
              })
            }
          </View>
          <View className='form-item'>
            <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <AtList>
                  <AtListItem
                    title='检测地址'
                    extraText={this.state.selectorChecked}
                  />
                </AtList>
              </Picker>
            </View>
          </View>
          <View className='form-item'>
            <AtButton formType='submit'>注册</AtButton>
          </View>
        </AtForm>
      </View>
      )
    }
}

export default Register  as ComponentType
