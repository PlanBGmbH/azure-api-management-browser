import { Responses } from './Responses';
import { Request } from './Request';
import { TemplateParameter } from './TemplateParameter';
// tslint:disable-next-line: class-name
export class ApisProperties {
  description?: string;
  displayName?: string;
  method?: string;
  responses?: Responses;
  request?: Request;
  templateParameter?: TemplateParameter;

}
