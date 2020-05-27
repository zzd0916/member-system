import Taro from '@tarojs/taro'
import { http } from '@utils'
import { getStorageByName, setStorageSync } from './stroage'
export default {
  /**
   * 仅用于微信
   */
  getOpenid() {
    return getStorageByName('openid');
  },
  /**
   * 获取登录信息
   */
  getSignCode() {
    const login = getStorageByName('_login_data');
    return !login ? '' : login.signCode;
  },

  async refresh(){
    // 每次进入个人中心页面都刷新一次个人登录信息
    let signCode = this.getSignCode();
    if(!signCode) signCode = '';
    const {
      state,
      data
    } = await http.get('/account/getLogin', {
      //openid: this.getOpenid()
      signCode,
    })
    if (state !== 1 || !data) return;
    this.setLogin(data)
  },
  /**
   * 设置登录信息
   */
  setLogin(loginData) {
    setStorageSync('_login_data', loginData);
  },
  /**
   * 获取登录信息
   */
  getLogin() {
    return getStorageByName('_login_data');
  },
  /**
   * 验证是否登录
   */
  isLogin() {
    const loginData = this.getLogin();
    return !!loginData && !!loginData._id;
  },
  getUserType() {
    const {
      type = 'user'
    } = this.getLogin();
    return type;
  },
  /**
   * 设置退出状态并跳转
   */
  async logout(p) {
    if(p){
      await http.post('/account/logout');
    }
    this.setLogin({});
    // location.href = '/';
    Taro.reLaunch({
      url: '/pages/login'
    })
  },
  /**
   * 判断是否拥有权限(可传入多个参数)
   */
  has(...opname) {
    const {
      role: {
        powers
      } = {}
    } = this.getLogin();
    if (opname.length === 1) opname = opname[0];

    if (!powers)
      return false;
    if (typeof opname === 'string')
      return powers ?
        !!powers[opname] :
        false;
    else if (opname.length)
      return opname.findIndex(key => powers[key]) !== -1;
    return false;
  }
};
