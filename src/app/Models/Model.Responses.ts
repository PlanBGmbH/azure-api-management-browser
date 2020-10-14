import { Representations } from './Model.Representations';
import { Header } from './Model.Header';
export class Responses {
  description: string;
  statusCode: number;  
  representations?: Representations[];  
  header?: Header[];
}