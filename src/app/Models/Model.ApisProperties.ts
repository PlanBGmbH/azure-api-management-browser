import { Responses } from './Model.Responses';
import { Request } from './Model.Request';
import { TemplateParameter } from './Model.TemplateParameter';
// tslint:disable-next-line: class-name
export class ApisProperties {
  description?: string;
  displayName?: string;
  method?: string;
  responses?: Responses[];
  request?: Request;
  templateParameter?: TemplateParameter;
  path?: string;
}
