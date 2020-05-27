
/**
 * 显示繁忙提示
 * @param {*} text
 */
const showBusy = text =>
  Taro.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  });

/**
 * 显示成功提示
 * @param {*} text
 */
const showSuccess = text =>
  Taro.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  });

/**
 * 显示失败提示
 * @param {*} title
 * @param {*} content
 */
const showModel = (title, content) => {
  Taro.hideToast();

  Taro.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

/**
 * 需通过dispatch函数派发单个
 * @param {*} type 类型
 * @param {*} payload 有效载荷
 */
const action = (type, payload) => ({ type, payload });

/**
 * 异步延时
 * @param {*} timeout
 */
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export {  showBusy, showSuccess, showModel, action, delay };