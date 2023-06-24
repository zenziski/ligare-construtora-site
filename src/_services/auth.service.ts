import { ApiCall } from './api';

interface IFormData {
    email: string,
    password: string
}

export const postLogin = async ({ email, password }: IFormData): Promise<any> => {
    return await new ApiCall('/login/auth').post<any, any>({ email, password });
}