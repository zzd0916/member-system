import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker, Radio } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtAvatar, AtRadio } from 'taro-ui'
import { IRegister, register } from '@api/registerApi'
import { format, toast } from '@utils'

import './register.scss'
import { IRegister } from 'src/api/registerApi'

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

  constructor() {
    super(...arguments)
    this.state = {
      title: "用户注册",
      name: '',
      idCard: ''
      phone: '',
      sexArray: [
        { label: '男', value: 'man' },
        { label: '女', value: 'woman' },
      ],
      sex: 'man',
      selector: ['新清泰克', '智能健身房', '巴西', '日本'],
      shop: '新清泰克',
      date: format.fromatDate(new Date(), '-')
    }
  }

  componentWillMount() {
  }

  componentWillReact() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
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
  onSubmit(event) {
    const { name, phone, sex, shop, date, idCard } = this.state
    this.checkParams()
    toast.showLoading(`注册ing...`);
    if (this.checkParams()) {
      let params: IRegister = {
        name,
        phone,
        sex,
        shop,
        date,
        idCard,
      }
      register(params).then( (res)=> {
        if(res.success) {
          Taro.reLaunch({
            url: '/pages/login/login'
          })
        } else {
          let errCode =  res.errCode || res.err_msg
          let errMsg =  res.errMsg || res.err_msg
          toast.alert({
            title: '注册失败',
            msg:`errCode: ${errCode}, errMsg: ${errMsg}`
          })
        }
      }).catch( e => {
        let errCode =  e.errCode || e.err_msg
        let errMsg =  e.errMsg || e.err_msg
        toast.alert({
          title: '出了点意外',
          msg: `errCode: ${errCode}, errMsg: ${errMsg}`
        })
      }).finally (e => {
        toast.hideLoading()
      })
    }
    return 
  }
   /**
   * 检查参数是否合法
   */
  checkParams(): boolean | undefined {
    const { name, phone, sex, shop, date, idCard } = this.state
    let flag = true
    if(!name || name.length<2) {
      toast.toast('名字不能为空且长度不小于2')
      flag = false
      return
    }
    if(!idCard || idCard.length<17) {
      toast.toast('身份证号不能为空且长度不小于17')
      flag = false
      return
    }
    if(!phone || phone.length<8) {
      toast.toast('手机号不能为空且长度不小于10')
      flag = false
      return
    }

    return flag
  }
  
  back() {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  onChange = e => {
    this.setState({
      shop: this.state.selector[e.detail.value]
    })
  }
  onDateChange = e => {
    this.setState({
      date: e.detail.value
    })
  }
  onSexChange = v => {
    this.setState({ sex: v })
  }
  render() {
    // const {RegisterStore } = this.props;
    const { title, sex, sexArray, selector, name, idCard, phone, date } = this.state
    return (
      <View className='register'>
        <View className='register-title'>
          <AtAvatar image='http://holomotion.ntsports.tech/img/logo.png' size={'large'}></AtAvatar>
          <View>{title}</View>
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
              value={name}
              maxLength={20}
              onChange={this.handleNameChange.bind(this)}
            />
          </View>
          <View className='form-item'>
            <AtInput
              name='idCard'
              title='身份证'
              type='idcard'
              placeholder='请输入身份证'
              value={idCard}
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
              value={phone}
              onChange={this.handlePhoneChange.bind(this)}
            />
          </View>
          <View className='form-item'>
            <Text className='at-input__title sex-label'>请选择性别</Text>
            <AtRadio
              options={sexArray}
              value={sex}
              onClick={this.onSexChange.bind(this)}
            />
          </View>
          <View className='form-item'>
            <View>
              <Picker mode='date' onChange={this.onDateChange}>
                <AtList>
                  <AtListItem title='请选择生日' extraText={date} />
                </AtList>
              </Picker>
            </View>
          </View>
          <View className='form-item'>
            <View>
              <Picker mode='selector' range={selector} onChange={this.onChange}>
                <AtList>
                  <AtListItem
                    title='检测地址'
                    extraText={this.state.shop}
                  />
                </AtList>
              </Picker>
            </View>
          </View>
          <AtButton formType='submit' className='submit-btn' type='primary' >注册</AtButton>
        </AtForm>
      </View>
    )
  }
}

export default Register as ComponentType
