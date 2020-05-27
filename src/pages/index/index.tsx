import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { showBusy, showSuccess } from '@utils/toast'

import { 
  AtFab 
} from 'taro-ui'

import './index.scss'

type PageStateProps = {
  counterStore: {
    counter: number,
    increment: Function,
    decrement: Function,
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps;
}

@inject('counterStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { 
    console.log('componentWillMount')
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { 
    console.log('componentDidMount')
  }

  componentWillUnmount () { 
    console.log('componentWillUnmount')
  }

  componentDidShow () { 
    console.log('componentDidShow')
  }

  componentDidHide () { 
    console.log('componentDidHide')
  }

  // increment = () => {
  //   const { counterStore } = this.props
  //   counterStore.increment()
  // }

  // decrement = () => {
  //   const { counterStore } = this.props
  //   counterStore.decrement()
  // }

  // incrementAsync = () => {
  //   const { counterStore } = this.props
  //   counterStore.incrementAsync()
  // }

  showTal () {
    showBusy("恭喜您，弹窗成功");
  }
  toLogin () {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        {/* <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button> */}
        <Button onClick={this.toLogin}>登陆</Button>
        <Text>{counter}</Text>
        <View className='at-icon at-icon-settings'></View>
        <AtFab>
  <Text className='at-fab__icon at-icon at-icon-menu'></Text>
</AtFab>
      </View>
    )
  }
}

export default Index  as ComponentType
