import { Representations } from './Representations';
import { QueryParameters } from './QueryParameters';

export class Request {
  description?: string;
  statusCode?: number;
  queryParameters?: QueryParameters;
  representations?: Representations[];
}