import { ApiAuth, ApiCall } from "./api";
import { TPremiseResponse } from "./interface/IDefaults";
import { BulkMailDto, IRegistrationInputs, IRegistrationResponse } from "./interface/user.interface";

export const getHistory = async (guid_company: string, guid_user: string, token: string): Promise<TPremiseResponse<any>> => {
  return await new ApiCall(`/users/history/${guid_company}/${guid_user}`, ApiAuth(token)).get();
}

/**
 * Get all users
 * @param token token user logged
 * @returns 
 */
export const getAll = async (token: string): Promise<TPremiseResponse<any>> => {
  return await new ApiCall(`/users/all`, ApiAuth(token)).get();
}


export const registerInBulk = async (bulkmails: any, guid_company: string): Promise<any> => {
  return await new ApiCall('/users/bulk/'+guid_company).post(bulkmails);
}