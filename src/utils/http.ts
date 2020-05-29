import Taro from '@tarojs/taro'
import { toast, auth, config } from './'
import { HTTP_STATUS } from '@constances/status'
import { getStorageByName, setStorageSync } from '@utils/stroage'
import Base64 from '@utils/Base64'

//const serverURL = 'https://member.ntsports.tech/service'; // 针对发布后的小程序
const serverURL = '/m/service';//针对测试期间的小程序（可测试服务端）
//const serverURL = 'http://127.0.0.1:7001'; // 针对测试H5（存在跨域，所以使用mock模拟）

function getCookie(cookies, c_name) {
  if (cookies.length > 0) {
    let c_start = cookies.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      let c_end = cookies.indexOf(';', c_start)
      if (c_end === -1) c_end = cookies.length
      return unescape(cookies.substring(c_start, c_end))
    }
  }
  return ''
}

function getHeader() {
  const cookie = Taro.getStorageSync('cookie');
  const header = {'content-type': 'application/json'};
  if (cookie && Object.keys(cookie).length) {
    header['Cookie'] = Object.keys(cookie).map(key => {
      return `${key}=${cookie[key]}`;
    }).join('; ');
  }
  // console.log('获取cookie:', document.cookie);
  if (cookie.csrfToken) {
    header['x-csrf-token'] = cookie.csrfToken;
  }else if(config.isWeb){
    header['x-csrf-token'] = getCookie(document.cookie, 'csrfToken');
  }
  return header;
}

function setHeader(_header) {
  let cookie = _header['set-cookie'];
  if (!cookie) cookie = _header['Set-Cookie'];
  if (!cookie) return;

  let header = getStorageByName('cookie');
  const cki = ['EGG_SESS', 'csrfToken'];
  if (!header) header = {};
  cki.forEach(key => {
    const v = getCookie(cookie, key);
    if (v && v.length) {
      header[key] = v;
    }
  });
  setStorageSync('cookie', header);
}

const interceptor = function (chain) {
  console.log("进入拦截器")
  const requestParams = chain.requestParams
  // const { method, data, url } = requestParams

  // let cacheRequest = getStorageByName('cacheRequst')
  // if(!cacheRequest) {
  //   console.log("没有cacheRequst数据，设置空数据")
  //   setStorageSync('cacheRequst',{})
  // };
  // console.log(`${method}-${url}-${JSON.stringify(data)}`)
  // const key = Base64.encode64(`${method}-${url}-${JSON.stringify(data)}`);
  // console.log(key)
  // console.log(cacheRequest[key])
  // if(!cacheRequest[key]) {
  //   console.log("设置 cacheRequest key ")
  //   cacheRequest[key] = 1;
  //   setStorageSync('cacheRequst',cacheRequest)
  // } else {
  //   console.log("您的操作太快了")
  //   return false
  // }
  return chain.proceed(requestParams)
  .then(res => {
    console.log("请求成功")
    res.key = key;
    return res
  })
}

export default {
  async request(method, url, data) {
    // 先调用拦截器
    console.log("调用拦截器")
    Taro.addInterceptor(interceptor)
    Taro.addInterceptor(Taro.interceptors.logInterceptor)
    Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
    console.log("请求开始")
    if(!data) data = {};
    // data._user_type_ = 'gh';//广汇定制版
    toast.showLoading();
    let r;
    try {
      r = await Taro.request({
        url: `${serverURL}${url}`,
        method,
        data,
        credentials:'include',//include
        header: getHeader()
      });
      //console.log('r', r);
    } catch (e) {
      // toast.alert({
      //   title: e.status+'',
      //   msg: e.statusText
      // })
      return {
        state: 0
      };
    } finally {
      toast.hideLoading();
    }
    setHeader(r.header);

    console.log(r)
    if (!(r.statusCode >= 200 && r.statusCode < 400)) {
      const error = {}
      error.statusCode = r.statusCode
      error.code = r.data.code
      error.message = r.data.error
      toast.alert('出了点意外',r.data.error)
      throw error
      return {
        state: 0
      };
    }
    const d = r.data;
    if (d.state === 0) {
      
      toast.alert('出了点意外',d.msg ? d.msg : '操作失败')
      return {
        state: 0
      };
    }
    if (d.state > 2) {
      toast.alert( d.msg ? d.msg : '操作失败')
      // 未登录跳转到登录页面
      if(d.state === 7){
        auth.logout();
      }
      return {
        state: 0
      };
    }
    return d;
  },
  async get(url, data) {
    return await this.request('GET', url, data);
  },
  async post(url, data) {
    return await this.request('POST', url, data);
  },
}
