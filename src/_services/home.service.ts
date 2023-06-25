import { ApiAuth, ApiCall } from "./api";

export const postImagesHome = async (data: any, token: string): Promise<any> => {
    return await new ApiCall('/home/images', ApiAuth(token)).post<any, any>(data)
}

export const postTextHome = async (data: any, token: string): Promise<any> => {
    return await new ApiCall('/home/text', ApiAuth(token)).post<any, any>(data)
}

export const getDataHome = async (token: any): Promise<any> => {
    return await new ApiCall('/home', ApiAuth(token)).get<any>()
}