export interface IRegionResponse {
  id_state: number;
  name: string;
  initials: string;
}

export interface ICityResponse {
  id_state: number;
  name: string;
  initials: string;
  cities: ICounty[];
}

export interface ICounty {
  id_city: number;
  name: string;
}