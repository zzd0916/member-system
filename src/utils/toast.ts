import Taro from '@tarojs/taro'
const ENV_TYPE = Taro.getEnv();
const {
  WEB,
  WEAPP
} = Taro.ENV_TYPE;

export default {
  isWeb: ENV_TYPE === WEB,
  isWx: ENV_TYPE === WEAPP,
  isInWx: true,//typeof WeixinJSBridge !== 'undefined', // 测试期间直接返回true
  reLaunch({
    url
  }) {
    if (ENV_TYPE === WEAPP) return Taro.reLaunch({
      url
    });
    return Taro.redirectTo({
      url
    });
  },
  showLoading(title='加载ing...') {
    Taro.showLoading({
      title
    })
  },
  hideLoading() {
    Taro.hideLoading()
  },
  toast(title, icon = 'none', duration = 2000) {
    return new Promise(resolve => {
      Taro.showToast({
        title,
        icon,
        duration
      });
      setTimeout(resolve, duration);
    });
  },
  confirm({
    title = '操作确认',
    msg,
    success,
    cancel,
    confirmText = '确定',
    cancelText = '取消',
  }) {
    if (!success) {
      return new Promise(resolve => {
        Taro.showModal({
          title,
          content: msg,
          confirmText,
          cancelText,
          success(res) {
            return resolve(!res.cancel)
          }
        })
      })
    }
    Taro.showModal({
      title,
      content: msg,
      confirmText,
      cancelText,
      async success(res) {
        if (res.cancel) {
          if (typeof cancel === 'function')
            return cancel();
          return;
        }
        if (typeof success === 'function')
          return success();
      }
    })
  },
  alert({
    title = '操作提示',
    msg,
    success=null,
  }) {
    if (!success) {
      return new Promise(resolve => {
        Taro.showModal({
          title,
          showCancel: false,
          content: msg,
          success(res) {
            return resolve(true)
          }
        })
      })
    }
    Taro.showModal({
      title,
      showCancel: false,
      content: msg,
      success
    })
  },
  actionMenu(itemList, success) {
    Taro.showActionSheet({
      itemList,
      success(res) {
        if (typeof success === 'function') {
          success(itemList[res.tapIndex]);
        }
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  }
}
