import { ApiAuth, ApiCall } from "./api";

export const postContact = async (data: any): Promise<any> => {
    return await new ApiCall(`/contact`).post<any, any>(data);
}

export const getContacts = async (token: string): Promise<any> => {
    return await new ApiCall(`/contact`, ApiAuth(token)).get<any>();
}