import { ApiAuth, ApiCall } from "./api";

export const postAbout = async (data: any, token: string): Promise<any> => {
    return await new ApiCall(`/about`, ApiAuth(token)).post<any, any>(data);
}

export const getAbout = async (): Promise<any> => {
    return await new ApiCall(`/about`).get<any>();
}