export interface IDefaultResponse<T> {
    status: number;
    requestTime: string;
    response: T;
  }
  
  export interface IErrorResponse {
    service: string;
    method: string;
    message: string;
  }
  
  export type TPremiseResponse<T> = IDefaultResponse<T> | IDefaultResponse<IErrorResponse>;