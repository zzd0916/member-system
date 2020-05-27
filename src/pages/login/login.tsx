import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import {  auth, lang } from '@utils'

import './login.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  },
  loginStore: {
    form: Object,
    languages:Array,
    activeLang: string,
    changeForm: Function
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

  setLang(val) {

  }
  render () {
    const {loginStore } = this.props;
    // onClick={ _ => this.setLng(item.value) } 
    return (
      <View className='block'>
       
        <View className='at-row at-row__justify--around' style='margin-top:20px;text-align:center'>
          {
            loginStore.languages.map( (item ) => {
              let cName = item.value === loginStore.activeLang ? 'at-col border-bottom' : 'at-col';
              return (
                <View className={cName} onClick={this.setLang(item.value)} >
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
