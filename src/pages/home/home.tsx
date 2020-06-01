import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Layout } from '@components'
import { AtButton } from 'taro-ui'
import { toast, lang } from '@utils'
interface IProps {
    props: {
    };
}

export interface IState {
}

@inject('langStore')
@observer
class Home extends Component<IProps, IState>{

    config: Config = {

    }

    static defaultProps = {
        current: 0
    }
    state = {
        topTitle: lang.getValByName('home'),
        backTitle: lang.getValByName('back_btn'),
        buildTitle: lang.getValByName('building_tip'),
        btnName: lang.getValByName('orderOL')
    }

    back() {
        Taro.navigateBack();
    }
    reload() {
        location.reload();
    }

    render() {
        const { current } = this.props
        return (
            <Layout title={this.state.topTitle} current={current}>
            <View className='block'>
              <AtButton type='secondary' onClick={ _ => toast.toast(this.state.buildTitle) }>{ this.state.btnName }</AtButton>
            </View>
          </Layout>
        )
    }
}


export default Home as ComponentType