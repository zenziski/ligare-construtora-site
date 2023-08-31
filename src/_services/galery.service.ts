import { ApiAuth, ApiCall } from "./api";

export const deleteImages = async (data: any, token: string): Promise<any> => {
    return await new ApiCall('/upload', ApiAuth(token)).put<any, any>({ ids: data });
}

export const getImages = async (page: any, token: string): Promise<any> => {
    return await new ApiCall(`/upload?page=${page}`, ApiAuth(token)).get<any>()
}

export const addImages = async (data: any, token: string): Promise<any> => {
    return await new ApiCall('/upload', ApiAuth(token, { 'Content-Type': 'multipart/form-data' })).post<any, any>(data)
}