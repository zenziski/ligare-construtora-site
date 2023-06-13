import { ApiAuth, ApiCall } from "./api";
import { TPremiseResponse } from "./interface/IDefaults";
import { IAccessibleCompaniesResponse, IGetCompany } from "./interface/company.interface";

export const getCompanyList = async(token: string): Promise<TPremiseResponse<IAccessibleCompaniesResponse[]>> => {
  return await new ApiCall(`/company/accessible-companies`, ApiAuth(token)).get<IAccessibleCompaniesResponse[]>();
}

export const getCompany = async(guid_company: string, token: string): Promise<TPremiseResponse<IGetCompany>> => {
  return await new ApiCall(`/company/info/${guid_company}`, ApiAuth(token)).get<IGetCompany>();
}