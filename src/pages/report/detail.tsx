import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, WebView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtButton, AtInput } from 'taro-ui'
import { Layout, TipPanel, ImagePanel } from '@components'
import { auth, util, cfg, http, lang } from '@utils'
import { getDetail } from '@api/reportApi'
import './report.scss'

@inject('reportStore')
@observer
export default class Detail extends Component {
  config = {
    navigationBarTitleText: lang.getValByName('report'),
  }
  async componentDidMount() {
    const { _id = '' } = this.$router.params;
    // console.log('detail_id', this.$router, this.$router.params);
    if (!_id || !_id.length) {
      await util.toast(lang.getValByName('params_err_tip'));
      return;// util.reLaunch({ url: '/pages/report/list' }); // 暂时停在此页
    }
    this.fetch({ _id });
  }
  fetch(search) {
    const { reportStore } = this.props
    search.__lng = lang.getLng();
    getDetail(search).then(res => {
      if(res) {
        const { success, data:{data} } = res
        if(success) {
          reportStore.setList(list)
        }
      }
    })
  }

  onBuy() {
    const { reportStore: { buyReport, data } } = this.props
    util.confirm({
      msg: `确认购买此报告吗?`,
      success: _ => {
        buyReport({ _id: data._id }, async state => {
          await util.toast('报告购买成功');
          this.fetch({ _id: data._id });
          // return util.reLaunch({ url: '/pages/report/list' });
        })
      },
    });
  }

  render() {
    const { reportStore: { data } } = this.props

    return (
      <Layout title={this.config.navigationBarTitleText} canBack={_ => util.reLaunch({ url: '/pages/report/list' })} noTabBar onReload={_ => location.reload()}>
        <View className='at-row title_panel'>
          <View className='at-col at-col-3'>
            <View className='img'><Text style={{ fontSize: 32, color: 'red' }}>{data.score_overall}</Text></View>
          </View>
          <View className='at-col at-col-9'>
            <View className='title'>
              {data.realName}
            </View>
            <View className='title'>
              {data.date}
            </View>
          </View>
        </View>
        <View className='at-row state_panel'>
          <View className='at-col item'>
            <View><Text className='title'>{data.score_arom}</Text></View>
            <View>{lang.getValByName('arom')}</View>
          </View>
          <View className='at-col item'>
            <View><Text className='title'>{data.score_stability}</Text></View>
            <View>{lang.getValByName('stability')}</View>
          </View>
          <View className='at-col item'>
            <View><Text className='title'>{data.score_symmetry}</Text></View>
            <View>{lang.getValByName('symmetry')}</View>
          </View>
        </View>

        {!data.url ?
          <View className='block'>
            <AtButton type='secondary' onClick={_ => this.onBuy()}>查看报告</AtButton>
          </View> :
          <WebView src={data.url} style='margin-top:50px' />}
      </Layout>
    )
  }
};
