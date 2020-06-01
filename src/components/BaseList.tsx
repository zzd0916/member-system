import Taro, { Component } from '@tarojs/taro'
import { cfg, util } from '@utils'
const ENV_TYPE = Taro.getEnv();
const { WEB, WEAPP } = Taro.ENV_TYPE;

export default class BaseList extends Component {
  state = {
    optIsOpend: false,
    edItem: {},
    moreStatus: 'more',
  }
  onPullDownRefresh(){
    this.fetch({ p:1 });
    Taro.stopPullDownRefresh();
  }
  onMore(){
    if(typeof this.fetch === 'function'){
      this.setState({
        status: 'loading'
      });
      const { p, search } = this.props[this.storeName];
      search.p = p + 1;
      this.fetch(search);
    }
  }
  onSelect(edItem){
    this.setState({ optIsOpend:true, edItem })
  }
}
