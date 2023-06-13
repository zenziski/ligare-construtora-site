export interface IUserInfo {
  guid_user: string;
  name: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  isBlocked: boolean;
  isValidated: boolean;
}

export interface IFilter {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IRegistrationInputs {
  name: string;
  email: string;
  guid_company: string;
}

export interface IRegistrationResponse {
  user: string;
  company: string;
  email: string;
  confirmationMailSent: boolean;
}

export interface BulkMailDto {
  name: string;
  email: string;
}