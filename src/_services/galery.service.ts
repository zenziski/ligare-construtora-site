import { ApiCall } from "./api";

export const deleteImages = async (data: any): Promise<any> => {
    return await new ApiCall('/upload').put<any, any>({ ids: data });
}

export const getImages = async (): Promise<any> => {
    return await new ApiCall('/upload').get<any>()
}