import { PageEvent } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Service } from '../Models/Model.Service';
import { Apis } from '../Models/Model.Apis';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetServiceListResponseDTO } from '../Models/GetServiceListResponseDTO';
import { Stages } from '../Stages';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  urlServiceProd =
    'https://preview-demo-mm01.azure-api.net/private/api/management/apis/';
  urlServiceStaged =
    'https://preview-demo-mm01.azure-api.net/private/api/management/dev/apis/';

  getListByService(stage: Stages, pageIndex): Promise<GetServiceListResponseDTO> {
    const url = stage === Stages.production ? this.urlServiceProd : this.urlServiceStaged;
    return this.http.get<GetServiceListResponseDTO>(`${url}?page=${pageIndex}`).toPromise();
  }

  getListByApi(param: string, stage: Stages): Observable<Apis> {
    const url = stage === Stages.production ? this.urlServiceProd : this.urlServiceStaged;
    return this.http.get<Apis>( url + param);
  }
}
