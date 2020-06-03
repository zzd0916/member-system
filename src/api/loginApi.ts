import http from '@utils/servers'

export interface ILogin {
    phone: number;
    code: number;
}
export interface ISendCode {
    phone: number;
}

export const login =  async (parms: ILogin) => {
    return await http.post('/api/user/login',parms)
}

export const sendCode = async (parms: ISendCode) => {
    return await http.post('/api/service/sendCode',parms)
}