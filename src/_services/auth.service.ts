import { ApiCall } from './api';
import { TPremiseResponse } from './interface/IDefaults';

interface IFormData {
    email: string,
    password: string
}

export const postLogin = async ({ email, password }: IFormData): Promise<TPremiseResponse<any>> => {
    return await new ApiCall('/auth/login').post<any, any>({ email, password });
}