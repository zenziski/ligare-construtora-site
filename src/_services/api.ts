import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { IDefaultResponse, IErrorResponse, TPremiseResponse } from "./interface/IDefaults";

export const ApiAuth = (token: string, add: object | undefined = undefined) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...add
    },
  }
}

export class ApiCall {
  base = process.env.NEXT_PUBLIC_BACKEND_API;
  currentRoute: string | null = null;
  currentConfig: any | undefined = undefined;

  /**
   * Start an API call
   * @param route The route
   * @returns 
   * @example
   * await new ApiCall(route).post<ResponseInterface,InputInterface>(data)
   * //**ResponseInterface** = Response Interface (The object that returns from the Backend, inside the "response" Object)
   * //**InputInterface** = Input Interface (Object that is being passed to the system)
   */
  constructor(route: string, config: AxiosRequestConfig | undefined = undefined) {
    this.currentRoute = route;
    this.currentConfig = config;
    return this;
  }

  private caller(): AxiosInstance {
    return axios.create({ baseURL: this.base, timeout: 300000 });
  }

  private blob(): AxiosInstance {
    return axios.create({ baseURL: this.base, timeout: 300000, responseType: 'blob' })
  }

  async download<InputInterface>(obj?: InputInterface | undefined): Promise<any> {
    try {
      const data = await this.blob().post(this.currentRoute as string, obj, this.currentConfig);
      return data.data;
    } catch (err: any) {
      return err;
    }
  }

  /**
   * Post Request
   * @param obj 
   * @returns 
   */
  async post<ResponseInterface, InputInterface>(obj?: InputInterface | undefined): Promise<TPremiseResponse<ResponseInterface>> {
    try {
      const data = await this.caller().post(this.currentRoute as string, obj, this.currentConfig);
      return data.data as IDefaultResponse<ResponseInterface>;
    } catch (err: any) {
      return (err as AxiosError).response?.data as IDefaultResponse<IErrorResponse>;
    }
  }

  /**
   * Patch Request
   * @param obj 
   * @returns 
   */
  async patch<ResponseInterface, InputInterface>(obj?: InputInterface | undefined): Promise<TPremiseResponse<ResponseInterface>> {
    try {
      const data = await this.caller().patch(this.currentRoute as string, obj, this.currentConfig);
      return data.data as IDefaultResponse<ResponseInterface>;
    } catch (err: any) {
      return (err as AxiosError).response?.data as IDefaultResponse<IErrorResponse>;
    }
  }

  /**
   * Put Request
   * @param obj 
   * @returns 
   */
  async put<ResponseInterface, InputInterface>(obj?: InputInterface | undefined): Promise<TPremiseResponse<ResponseInterface>> {
    try {
      const data = await this.caller().put(this.currentRoute as string, obj, this.currentConfig);
      return data.data as IDefaultResponse<ResponseInterface>;
    } catch (err: any) {
      return (err as AxiosError).response?.data as IDefaultResponse<IErrorResponse>;
    }
  }

  /**
   * Get Request
   * @returns 
   */
  async get<ResponseInterface>(): Promise<TPremiseResponse<ResponseInterface>> {
    try {
      const data = await this.caller().get(this.currentRoute as string, this.currentConfig);
      return data.data as IDefaultResponse<ResponseInterface>;
    } catch (err: any) {
      return (err as AxiosError).response?.data as IDefaultResponse<IErrorResponse>;
    }
  }

  async delete<ResponseInterface>(): Promise<TPremiseResponse<ResponseInterface>> {
    try {
      const data = await this.caller().delete(this.currentRoute as string, this.currentConfig);
      return data.data as IDefaultResponse<ResponseInterface>;
    } catch (err: any) {
      return (err as AxiosError).response?.data as IDefaultResponse<IErrorResponse>;
    }
  }
}