export interface PostCreateRegionDTO {
  name: string;
  email: string;
  phone: string;
  subscription: string;
  polygon: Array<{ latitude: number; longitude: number }>;
}

export interface ResponseCreateRegionDTO {
  isOk?: boolean;
  statusCode: number;
  data?: any;
}
