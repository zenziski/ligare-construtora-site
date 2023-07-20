import { ApiAuth, ApiCall } from "./api";

export const getDataHome = async (): Promise<any> => {
    return await new ApiCall('/home').get<any>()
}

export const postHomeData = async (body: any, token: any): Promise<any> => {
    return await new ApiCall('/home', ApiAuth(token)).post<any, any>(body)
}