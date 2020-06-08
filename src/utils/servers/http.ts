import Taro from '@tarojs/taro'
import interceptors from './interceptors'
import { toast } from '@utils'
import { util } from '@utils'
import { setStorageSync } from '@utils/stroage'
import { HTTP_STATUS } from '@constances/status'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {

  async baseOptions(params, method = "GET") {

    let { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'authorization': Taro.getStorageSync('token')
      }
    };

    toast.showLoading();
    let result = null;
    try {
      result = await Taro.request(option);
    } catch (e) {
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (e.status === HTTP_STATUS.SERVER_ERROR) {
        return Promise.reject("服务器内部错误")

      } else if (e.status === HTTP_STATUS.NOT_FOUND) {
        return Promise.reject("请求资源不存在")

      } else if (e.status === HTTP_STATUS.BAD_GATEWAY) {
        return Promise.reject("服务端出现了问题")

      } else if (e.status === HTTP_STATUS.FORBIDDEN) {
        setStorageSync("_login_data", "")
        return Promise.reject("没有权限访问");

      } else if (e.status === HTTP_STATUS.AUTHENTICATE) {
        setStorageSync("_login_data", "")
        toast.confirm({
          title: String(e.status),
          msg: "鉴权失败，请重新登陆",
          success: ()=> {
            Taro.navigateTo({
              url: "/pages/login/login"
            })
          }
        })
        return 
      }
      toast.alert({
        title: String(e.status),
        msg: e.statusText
      })
    } finally {
      toast.hideLoading();
    }
    return result
  }

  async get(url, data = "") {
    let option = { url, data };
    return await this.baseOptions(option);
  }

  async post(url, data, contentType) {
    let params = { url, data, contentType };
    return await this.baseOptions(params, "POST");
  }

  async put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()