import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtLoadMore, AtIcon, AtButton, AtTabs, AtTabsPane } from 'taro-ui'
import { Layout, ReportSearch } from '@components'
import BaseListComponent from '@components/baseListComponent'
import { cfg, util, lng } from '@utils'
import './list.scss'

@inject('reportStore', 'langStore')
@observer
export default class extends BaseListComponent {
  storeName = 'reportStore';
  config = {
    navigationBarTitleText: langStore.getByKey('report'),
    enablePullDownRefresh: true,
  }
  
  state = {
    ...this.state,
    tabCurrIdx: 0,
  }
  async componentDidMount () {
    this.fetch({ p:1 });
  }
  fetch (search) {
    //console.log('fetch:', search);
    const { reportStore } = this.props
    reportStore.getList(search)
  }
  onClick({ _id }){
    // console.log('list_onclick', _id);
    Taro.navigateTo({ url: '/pages/report/detail?_id='+ _id })
  }
  setTab(tabCurrIdx){
    this.setState({ tabCurrIdx })
    this.fetch({ p:1, state: tabCurrIdx });
  }

  render () {
    const { reportStore: { list, ps, count } } = this.props
    const { moreStatus, tabCurrIdx } = this.state;

    return (
      <Layout title={this.config.navigationBarTitleText} current={1} onReload={ _ => this.fetch() }>
      <AtTabs style="margin-top:-30px" current={ tabCurrIdx } tabList={tabList} onClick={ tabCurrIdx => this.setTab(tabCurrIdx) }>
      </AtTabs>
        <View>
          <reportSearch onSearch={ search => this.fetch({ p:1, ...search }) } />
        { list.map(l => <View key={ l._id } onClick={ _ => this.onClick(l) } className='at-row list_row'>
          <View className='at-col at-col-3'>
            <View className='img'><Text style={{ fontSize:24,color:'red' }}>{ l.score_overall }</Text></View>
          </View>
          <View className='at-col at-col-9'>
            <View className='at-row title'>
              { l.realName } | { l.date }
            </View>
            <View className='at-row state_panel'>
              <View className='at-col item'>
                <View><Text className='title'>{ l.score_arom }</Text></View>
                <View>{langStore.getByKey('arom')}</View>
              </View>
              <View className='at-col item'>
                <View><Text className='title'>{ l.score_stability }</Text></View>
                <View>{langStore.getByKey('stability')}</View>
              </View>
              <View className='at-col item'>
                <View><Text className='title'>{ l.score_symmetry }</Text></View>
                <View>{langStore.getByKey('symmetry')}</View>
              </View>
            </View>
          </View>
        </View>)}
        <AtLoadMore
          onClick={ _ => this.onMore() }
          status={ count < ps ? 'noMore' : moreStatus }
        />
        </View>
      </Layout>
    )
  }
}
