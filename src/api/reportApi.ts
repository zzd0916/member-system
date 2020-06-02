import http from '@utils/servers'

export interface IReportList {
    count: number;
    list: Array<object>;
    state: number;
}

export interface Itester {
    _id: string;
    realName: string;
    phone: string | number;
}

export interface IDetailData {
    _id: string;
    Detection_Id: string;
    date: string;
    realName: string;
    score_arom: number;
    score_overall: number;
    score_stability: number;
    score_symmetry: number;
    tester: Itester;
    url: string;
}

export interface IReportDetail {
    data: IDetailData;
    state: number;
}

/**
 * @param param p: 当前页; ps: 分页大小
 * @return IReportList
*/
export const getList =  async (parms: IReportList) => {
    return await http.get('/api/m/service/report/',parms)
}

/**
 * @param parms  _id; __lng
 * @return IReportDetail
 */
export const getDetail = async (parms: IReportDetail) => {
    return await http.get('/api/m/service/report/detail',parms)
}