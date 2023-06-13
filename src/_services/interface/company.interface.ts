export interface IAccessibleCompaniesResponse {
  guid_company: string;
  guid_parent: string;
  name: string;
  cnpj: string;
  type: string;
  companyCode: string;
  isScheduled: boolean;
  city: string;
  state: string;
  initials: string;
  stateReg: string;
  users: number;
  isActive: boolean;
  isRegFinished: boolean;
  createdAt: string;
  updatedAt: string;
  products?: string;
  recurrency: string;
  certSearch?: boolean;
  branches: IAccessibleCompaniesResponse[];
  weeklyUpdate?: boolean;
  weeklyParticipants?: string;
}

export interface IGetCompany {
  guid_company: string;
  guid_parent: string | null;
  name: string;
  cnpj: string;
  stateReg: string;
  isRegFinished: boolean;
  isActive: boolean;
  isSSOAuth: boolean;
  createdAt: string;
  updatedAt: string;
	location: null;
}