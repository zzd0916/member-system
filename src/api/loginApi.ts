import { http } from '@utils'

export interface loginProps {
    phone: number;
    code: number;
}
export interface sendCodeProps {
    phone: number;
    code: number;
}

export const login =  async (parms: loginProps) => {
    return await http.post('/api/login',parms)
}

export const sendCode = async (parms: sendCodeProps) => {
    return await http.post('/api/sendCode',parms)
}