import { Endpoints } from '../../endpoints';
import { FetchHttpFactory } from '../../http';
import { ResponseCreateRegionDTO, PostCreateRegionDTO } from './interfaces';

const fetchHttpFactory = new FetchHttpFactory();
const http = fetchHttpFactory.createHttp(Endpoints.Main.Geo);

export const createRegion = (data: PostCreateRegionDTO) =>
  http.post<ResponseCreateRegionDTO>(Endpoints.Geo.Create, data);
