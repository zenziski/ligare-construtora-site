import { ApiCall } from './api';
import { TPremiseResponse } from './interface/IDefaults';

export const getAllCalls = async (): Promise<TPremiseResponse<any>> => {
    return await new ApiCall('/cnd/', undefined, true).get<any>();
}