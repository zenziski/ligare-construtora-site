import { ApiAuth, ApiCall } from "./api";

export const getObras = async (): Promise<any> => {
    return await new ApiCall('/obras').get<any>()
}
export const getObrasById = async (id: any): Promise<any> => {
    return await new ApiCall(`/obras/${id}`).get<any>()
}

export const postObras = async (body: any, token: any): Promise<any> => {
    return await new ApiCall('/obras', ApiAuth(token)).post<any, any>(body)
}

export const editObras = async (body: any, token: any): Promise<any> => {
    return await new ApiCall('/obras/edit', ApiAuth(token)).post<any, any>(body)
}

export const editMainImage = async (body: any, token: any): Promise<any> => {
    return await new ApiCall('/obras/editMainImage', ApiAuth(token)).put<any, any>(body)
}

export const deleteObra = async (id: any, token: any): Promise<any> => {
    return await new ApiCall(`/obras/${id}`, ApiAuth(token)).delete<any>()
}

export const editCover = async (body: any, token: any): Promise<any> => {
    return await new ApiCall(`/obras/editCover`, ApiAuth(token)).post<any, any>(body)
}