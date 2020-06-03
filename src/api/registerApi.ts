import http from '@utils/servers'

export interface IRegister {
    phone: number;
    name: string;
    idCard: string;
    sex: string;
    shop: string;
    date: string;
}

export const register =  async (parms: IRegister) => {
    return await http.post('/api/user/register',parms)
}
