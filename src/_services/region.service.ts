import { ApiCall } from "./api";
import { TPremiseResponse } from "./interface/IDefaults";
import { ICityResponse, IRegionResponse } from "./interface/region.interface";

export const getStates = async (): Promise<TPremiseResponse<IRegionResponse[]>> => {
  return await new ApiCall('/region/states').get<IRegionResponse[]>();
}

export const getCityByState = async (id_state: number): Promise<TPremiseResponse<ICityResponse>> => {
  return await new ApiCall(`/region/states/${id_state}`).get<ICityResponse>();
}