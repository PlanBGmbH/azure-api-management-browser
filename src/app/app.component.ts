import { Component } from '@angular/core';
import { service } from './service';
import { apis } from './apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { KeyValuePipe } from '@angular/common';
import { display_data } from './display_data';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { apisProperties } from './apisProperties';




const ELEMENT_DATA: display_data[] = [];

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
              <th class="column100 column1" data-column="column1">ID</th>
              <th class="column100 column2" data-column="column2">Display Name</th>
              <th class="column100 column3" data-column="column3">Path</th>
              <th class="column100 column4" data-column="column4">Service Url</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row100" *ngFor="let el of serviceDisplayData">
              <td class="column100 column1" data-column="column1" (click)="getApiList(el.name)">{{el.name}}</td>
              <td class="column100 column2" data-column="column2" value="el.name" (click)="getApiList(value)">{{el.properties.displayName}}</td>
              <td class="column100 column3" data-column="column3" value="el.name" (click)="getApiList(value)">{{el.properties.path}}</td>
              <td class="column100 column4" data-column="column4" value="el.name" (click)="getApiList(value)">{{el.properties.serviceUrl}}</td>
            </tr>
            </tbody>
        </table>
      </div>


  
<mat-card>

<p>
<div class="limiter">
<div class="container-table100">
  <div class="wrap-table100">
    <div class="table100 ver1 m-b-110">
      <table data-vertable="ver1">
        <thead>
          <tr class="row100 head">
            <th class="column100 column1" data-column="column1">Method</th>
            <th class="column100 column2" data-column="column2">Path</th>
            <th class="column100 column3" data-column="column3">Display Name</th>
            <th class="column100 column4" data-column="column4">Description</th>
            <th class="column100 column5" data-column="column5">Query Parameter</th>
            <th class="column100 column6" data-column="column6">Header Parameter</th>
            <th class="column100 column7" data-column="column7">Request Body</th>
            <th class="column100 column8" data-column="column8">Responses Status</th>
          </tr>
        </thead>
        <tbody>
        <tr mdbTableCol *ngFor="let el of apisDisplayData">
    <td class="column100 column1" data-column="column1">{{el.properties.method}}</td>
    <td class="column100 column2" data-column="column2">{{el.id}}</td>
    <td class="column100 column3" data-column="column3">{{el.name}}</td>
    <td class="column100 column4" data-column="column4">{{el.properties.description}}</td>
    <td class="column100 column5" data-column="column5">{{el.properties.request.queryParameters}}</td>
    <td class="column100 column6" data-column="column6">{{el.properties.method}}</td>
    <td class="column100 column7" data-column="column7">{{el.properties.request.representations}}</td>
    <td class="column100 column8" data-column="column8">{{el.name}}</td>
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
  observ: any;
  displayedColumns = ['name', 'id', 'path', 'serviceUrl'];

  serviceData: service;
  apiData: apis;
  serviceDisplayData: service[];
  apisDisplayData: apis[];

  formatData() {


  }

  constructor(private service: HttpService) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.service.getListByService().subscribe(data => {
      this.serviceData = data;
      this.writeValueToArray();
    });


    // this.displayedColumns = ['id', 'displayName', 'description', 'path'];

  }
  writeValueToArray() {
    const mapped = Object.keys(this.serviceData).map(key => ({ type: key, value: this.serviceData[key] }));
    this.serviceDisplayData = mapped[0].value;

    // for (let index = 0; index < this.serviceDisplayData.length; index++) {
    //   const element = this.serviceDisplayData[index];
    // }
    for (const iterator of this.serviceDisplayData) {
      const element = iterator;
      const obj = new display_data(iterator.name, iterator.id, iterator.properties.path, iterator.properties.serviceUrl);
      ELEMENT_DATA.push(obj);
    }
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





