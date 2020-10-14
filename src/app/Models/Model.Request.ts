import { Representations } from './Model.Representations';
import { QueryParameters } from './Model.QueryParameters';
import { Header } from './Model.Header';

export class Request {
  description?: string;
  statusCode?: number;
  queryParameters?: QueryParameters[];
  representations?: Representations[];
  header?: Header[];
}