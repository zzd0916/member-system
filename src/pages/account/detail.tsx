import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import {
  AtButton, AtInput,
} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import { Layout, ImagePanel } from '@components'
import { config, util } from '@utils'

@inject('accountStore')
@observer
export default class account extends Component {
  config = {
    navigationBarTitleText: '个人信息',
    enablePullDownRefresh: true,
  }
  state = {
    name: null,
    phone: null,
    address: null,
  }
  componentDidMount () {
    this.fetch();
  }
  fetch (search) {
    const { accountStore } = this.props
    accountStore.getData(null, r => {
      if(r.state === 1 && r.data){
        const { name, phone, address } = r.data;
        this.setState({ name, phone, address });
      }
    })
  }

  render () {
    const { accountStore: { data } } = this.props
    const { name, phone, address } = this.state;

    return (
      <Layout title={this.config.navigationBarTitleText} canBack>
        <View className='panel_title'>个人信息</View>

      </Layout>
    )
  }
}
