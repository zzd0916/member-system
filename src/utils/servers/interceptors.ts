import Taro from '@tarojs/taro'
import { pageToLogin } from "./utils"
import { HTTP_STATUS } from '@constances/status'
import { setStorageSync } from '@utils/stroage'


const customInterceptor = (chain) => {
    const requestParams = chain.requestParams
    return chain.proceed(requestParams).then(res => {
        // 只要请求成功，不管返回什么状态码，都走这个回调
        console.log('res',res)
       if(res.statusCode === HTTP_STATUS.SUCCESS) {
            return res.data
        } else if( res.statusCode === HTTP_STATUS.SERVER_ERROR) {
            return Promise.reject("服务器内部错误")

        } else if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
            return Promise.reject("请求资源不存在")

        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
            return Promise.reject("服务端出现了问题")

        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
            setStorageSync("_login_data", "")
            pageToLogin()
            return Promise.reject("没有权限访问");

        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
            setStorageSync("_login_data", "")
            pageToLogin()
            return Promise.reject("需要鉴权")
        } 
    })
}

const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors