import { Component, Injectable } from '@angular/core';
import { Service } from './Service';
import { Apis } from './Apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { KeyValuePipe } from '@angular/common';
import { Display_data } from './Display_data';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { ApisProperties } from './ApisProperties';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <p>
  <div class="limiter">
  <div class="container-table100">
    <div class="wrap-table100">
      <div class="table100 ver1 m-b-110">
        <table data-vertable="ver1">
          <thead>
            <tr class="row100 head">
              <th class="column100 column1" data-column="column1">
              ID
              </th>
              <th class="column100 column2" data-column="column2">
              Display Name
              </th>
              <th class="column100 column3" data-column="column3">
              Path
              </th>
              <th class="column100 column4" data-column="column4">
              Service Url
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="row100" *ngFor="let el of serviceDisplayData">
              <td class="column100 column1" data-column="column1" (click)="getApiList(el.name)">
              {{el?.name}}
              </td>
              <td class="column100 column2" data-column="column2" value="el.name" (click)="getApiList(el.name)">
              {{el?.properties.displayName}}
              </td>
              <td class="column100 column3" data-column="column3" value="el.name" (click)="getApiList(el.name)">
              {{el?.properties.path}}
              </td>
              <td class="column100 column4" data-column="column4" value="el.name" (click)="getApiList(el.name)">
              {{el?.properties.serviceUrl}}
              </td>
            </tr>
            </tbody>
        </table>
      </div>


<mat-card>

<div class="limiter">
<div class="container-table100">
  <div class="wrap-table100">
    <div class="table100 ver1 m-b-110">
      <table data-vertable="ver1">
        <thead>
          <tr class="row100 head">
            <th class="column100 column1" data-column="column1">
            Method
            </th>
            <th class="column100 column2" data-column="column2">
            Path
            </th>
            <th class="column100 column3" data-column="column3">
            Display Name
            </th>
            <th class="column100 column4" data-column="column4">
            Description
            </th>
            <th class="column100 column5" data-column="column5">
            Query Parameter
            </th>
            <th class="column100 column6" data-column="column6">
            Header Parameter
            </th>
            <th class="column100 column7" data-column="column7">
            Request Body
            </th>
            <th class="column100 column8" data-column="column8">
            Responses Status
            </th>
          </tr>
        </thead>
        <tbody>
        <tr mdbTableCol *ngFor="let el of apisDisplayData">
            <td class="column100 column1" data-column="column1">
            {{el.properties?.method}}
            </td>
            <td class="column100 column2" data-column="column2">
            {{el?.id}}
            </td>
            <td class="column100 column3" data-column="column3">
            {{el?.name}}
            </td>
            <td class="column100 column4" data-column="column4">
            {{el.properties?.description}}
            </td>
            <td class="column100 column5" data-column="column5">
            
            {{el.properties.request?.queryParameters.description}}
            {{el.properties.request?.queryParameters.name}}
            {{el.properties.request?.queryParameters.type}}
           
            </td>
            <td class="column100 column6" data-column="column6">
            {{el?.properties.method}}
            </td>
            <td class="column100 column7" data-column="column7">
              <span *ngFor = "let item of el.properties.request?.representations">
                {{item?.contentType}}
                {{item?.schemaId}}
                {{item?.represetypeName}}
               </span>
             </td>
            <td class="column100 column8" data-column="column8">
Test
            </td>
          </tr>
          </tbody>
      </table>
    </div>
  ` ,
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class AppComponent {
  serviceData: Service;
  apiData: Apis;
  serviceDisplayData: Service[];
  apisDisplayData: Apis[];


  constructor(private service: HttpService) { }


  ngOnInit() {
    this.service.getListByService().subscribe(data => {
      this.serviceData = data;
      this.writeValueToArray();
    });
  }

  writeValueToArray() {
    const mapped = Object.keys(this.serviceData).map(key => ({ type: key, value: this.serviceData[key] }));
    this.serviceDisplayData = mapped[0].value;
  }
  getApiList(param: string) {
    this.service.getListByApi(param).subscribe(data => {
      console.log(data);
      this.apiData = data;
      this.writeValueToArray();
    });
    console.log(this.apiData);
    const mapped = Object.keys(this.apiData).map(key => ({ type: key, value: this.apiData[key] }));
    this.apisDisplayData = mapped[0].value;
    console.log(this.apisDisplayData);
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error) {
    console.log("This is a test for errors");
  }
}







