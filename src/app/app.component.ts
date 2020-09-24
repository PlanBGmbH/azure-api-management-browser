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
  <mat-toolbar class="ColorClass">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <span>PlanB API Management Portal</span>
    <span class="example-spacer"></span>
  </mat-toolbar>
 </p>

 <table  class="styled-table">
 <thead>
   <tr>
     <th scope="col">ID </th>
     <th scope="col">Display Name</th>
     <th scope="col">Path</th>
     <th scope="col">Service Url</th>
   </tr>
 </thead>
 <tbody>
   <tr mdbTableCol *ngFor="let el of serviceDisplayData">
     <th scope="row" (click)="getApiList(el.name)">{{el.name}}</th>
     <td onClick="getApiList(el.name)">{{el.properties.displayName}}</td>
     <td onClick="getApiList(el.name)">{{el.properties.path}}</td>
     <td onClick="getApiList(el.name)">{{el.properties.serviceUrl}}</td>
   </tr>
 </tbody>
</table>

<mat-card>
<table  class="styled-table">
<thead>
  <tr>
    <th scope="col">ID </th>
    <th scope="col">Display Name</th>
    <th scope="col">Description</th>
  </tr>
</thead>
<tbody>
  <tr mdbTableCol *ngFor="let el of apisDisplayData">
    <th scope="row" (click)="getApiList(el.name)">{{el.name}}</th>
    <td onClick="getApiList(el.name)">{{el.properties.displayName}}</td>
    <td onClick="getApiList(el.name)">{{el.properties.description}}</td>
  </tr>
</tbody>
</table>

</mat-card>

  ` ,
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





