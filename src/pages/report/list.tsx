import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtLoadMore,  AtTabs } from 'taro-ui'
import { Layout, BaseList } from '@components'
import { getList } from '@api/reportApi'
import { lang, toast } from '@utils'

import './list.scss'

@inject('reportStore', 'langStore')
@observer
export default class extends BaseList {
  config = {
    navigationBarTitleText: lang.getValByName('report'),
    enablePullDownRefresh: true,
  }

  state = {
    list: []
    count: 0,
    ps: 10,
    tabCurrIdx: 0,
  }

  async componentDidMount() {
    this.fetch({ p: 1 });
  }

  fetch(s={p:1, state: this.state.tabCurrIdx, ps:10}) {
    const { reportStore } = this.props
    getList(s).then(res=> {
      if(res) {
        const { success, data:{list} } = res
        if(success) {
          reportStore.setList(list)
        }
      } else {
        toast.toast(res)
      }
    });
  }
  
  goDetail({ _id }) {
    // console.log('list_onclick', _id);
    Taro.navigateTo({ url: '/pages/report/detail?_id=' + _id })
  }
  setTab(tabCurrIdx) {
    this.setState({ tabCurrIdx })
    this.fetch({ p:1, state: tabCurrIdx });
  }

  render() {
    const {reportStore, reportStore: { list, count, ps } , langStore } = this.props
    const { moreStatus, tabCurrIdx } = this.state;
    const tabList = [{
      title: langStore.getByKey('report_type_all')
    }, {
      title: langStore.getByKey('report_type_no')
    }, {
      title: langStore.getByKey('report_type_yes')
    }];

    return (
      <Layout title={this.config.navigationBarTitleText}  current={1} onReload={_ => this.fetch()}>
        <AtTabs style="margin-top:-30px" current={tabCurrIdx} tabList={tabList} onClick={tabCurrIdx => this.setTab(tabCurrIdx)}>
        </AtTabs>
        <View>
          {
            list.map(l => <View key={l._id} onClick={_ => this.goDetail(l)} className='at-row list_row'>
              <View className='at-col at-col-3'>
                <View className='img'><Text style={{ fontSize: 24, color: 'red' }}>{l.score_overall}</Text></View>
              </View>
              <View className='at-col at-col-9'>
                <View className='at-row title'>
                  {l.realName} | {l.date}
                </View>
                <View className='at-row state_panel'>
                  <View className='at-col item'>
                    <View><Text className='title'>{l.score_arom}</Text></View>
                    <View>{langStore.getByKey('arom')}</View>
                  </View>
                  <View className='at-col item'>
                    <View><Text className='title'>{l.score_stability}</Text></View>
                    <View>{langStore.getByKey('stability')}</View>
                  </View>
                  <View className='at-col item'>
                    <View><Text className='title'>{l.score_symmetry}</Text></View>
                    <View>{langStore.getByKey('symmetry')}</View>
                  </View>
                </View>
              </View>
            }

          </View>
          }
          <AtLoadMore
            onClick={_ => this.onMore()}
            status={count < ps ? 'noMore' : moreStatus}
          />
        </View>
      </Layout>
    )
  }
}
