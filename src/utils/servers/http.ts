import Taro from '@tarojs/taro'
import interceptors from './interceptors'
import { toast } from '@utils'

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
      // result = {
      //   success: true,
      //   data: {
      //     list: [
      //       {
      //         Detection_Id: "d35943dc0a18424c872ef7c933fb50dd",
      //         Time: "1576121175896",
      //         date: "12/12/2019",
      //         realName: "张泽东",
      //         score_arom: 80,
      //         score_overall: 74,
      //         score_stability: 79,
      //         score_symmetry: 66,
      //         tester: {_id: "5df0c811728d6a3c1d9e3dd3", realName: "张泽东", phone: "15680686538"},
      //         _id: "5df1b357728d6a3c1d9e3ddf"
      //       },
      //       {
      //         Detection_Id: "d35943dc0a18424c872ef7c933fb50dd",
      //         Time: "1576121175896",
      //         date: "12/12/2019",
      //         realName: "张泽东",
      //         score_arom: 80,
      //         score_overall: 74,
      //         score_stability: 79,
      //         score_symmetry: 66,
      //         tester: {_id: "5df0c811728d6a3c1d9e3dd3", realName: "张泽东", phone: "15680686538"},
      //         _id: "5df1b357728d6a3c1d9e3ddf"
      //       }
      //       ]
      //   }
      // }
    } catch (e) {
      toast.alert({
        title:"操作失败",
        msg: "请联系管理员"
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