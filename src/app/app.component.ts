import { Component, Injectable } from '@angular/core';
import { Service } from './Models/Model.Service';
import { Apis } from './Models/Model.Apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './Service/http.service';
import { KeyValuePipe } from '@angular/common';
import { Display_data } from './Models/Model.Display_data';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { ApisProperties } from './Models/Model.ApisProperties';
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
              <td class="column100 column1" data-column="column1" (click)="getApiList(el)">
              {{el?.name}}
              </td>
              <td class="column100 column2" data-column="column2" value="el.name" (click)="getApiList(el)">
              {{el?.properties.displayName}}
              </td>
              <td class="column100 column3" data-column="column3" value="el.name" (click)="getApiList(el)">
              {{el?.properties.path}}
              </td>
              <td class="column100 column4" data-column="column4" value="el.name" (click)="getApiList(el)">
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
            Apies
           </th>
          </tr>
        </thead>
        <tbody>
        <tr mdbTableCol *ngFor="let el of apisDisplayData">
        <mat-card style="border: 3px solid black;">
        <mat-card-title>{{el?.name}} </mat-card-title>
        <div>
        <div style="width:33%; display:inline-block;	border: 1px solid black;">
        <mat-card-title>Method</mat-card-title>
        {{el?.properties.method}}
      </div>
          <div style="width:33%; ; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Path</mat-card-title>
            {{el?.properties.urlTemplate}}
          </div>
          <div style="width:33%; ; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Header</mat-card-title>
            <span *ngFor="let item of el.properties.request?.header">
            <div>
              {{item?.name}}
              {{item?.description}}
              {{item?.type}}
              </div>
            </span>
          </div>
        </div>
        <div>
          <div style="width:75%; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Description</mat-card-title>
            {{el?.properties.description}}
          </div>
          <div style="width:25%; ; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Query Parameter</mat-card-title>
            <span *ngFor="let item of el.properties.request?.queryParameters">
            <div>
              {{item?.description}}
              {{item?.name}}
              {{item?.type}}
              <span *ngFor="let itm of item.values">
                Value: {{itm}}
              </span>
              </div>
            </span>
          </div>
        </div>
        <div>
          <div style="width:50%; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Request Body</mat-card-title>
            <span *ngFor="let item of el.properties.request?.representations">
            <div>
              {{item?.contentType}}
              {{item?.schemaId}}
              {{item?.represetypeName}}
              </div>
            </span>
          </div>
          <div style="width:50%; ; display:inline-block;	border: 1px solid black;">
          <mat-card-title>Responses</mat-card-title>
            <span *ngFor = "let item of el.properties?.responses">
              {{item?.statusCode}} {{item?.description}}
                <span *ngFor = "let itm of item.values">
                  Value: {{itm}}
                </span>
                <span *ngFor = "let item of item?.representations">
                <div>
                {{item?.contentType}}
                {{item?.schemaId}}
                {{item?.represetypeName}}
                </div>
               </span>
              </span>
          </div>
        </div>
      </mat-card>
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
  getApiList(services: Service) {
    this.service.getListByApi(services.name).subscribe(data => {
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
    console.log('This is a test for errors');
  }
}







