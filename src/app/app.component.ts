import { Component, Injectable } from '@angular/core';
import { Service } from './Models/Model.Service';
import { Apis } from './Models/Model.Apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './Service/http.service';
import { KeyValuePipe } from '@angular/common';
import { Display_data } from './Models/Model.Display_data';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { ApisProperties } from './Models/Model.ApisProperties';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //templateUrl: './mat-table-component/mat-table-component.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class AppComponent {
  panelOpenState = false;
  serviceData: Service;
  apiData: Apis;
  serviceDisplayData: Service[];
  apisDisplayData: Apis[];
  //Paginator
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  // MatPaginator Output
  pageEvent: PageEvent;



  constructor(private service: HttpService) { }


  ngOnInit() {
    this.service.getListByService().subscribe(data => {
      this.serviceData = data;
      this.writeValueToArray();
      console.log("TEST");
    });
  }

  public getServerData(event?: PageEvent) {

    // this.datasource =  this.serviceDisplayData;
    // this.pageIndex = this.serviceDisplayData.pageIndex;
    // this.pageSize = this.serviceDisplayData.pageSize;
    this.length = this.serviceDisplayData.length;
    return this.serviceData;
  }

  writeValueToArray() {
    const mapped = Object.keys(this.serviceData).map(key => ({ type: key, value: this.serviceData[key] }));
    this.serviceDisplayData = mapped[0].value;
  }
  getApiList(services: Service) {
    this.service.getListByApi(services.name).subscribe(data => {
      console.log(data);
      this.apiData = data;
      console.log(this.apiData);
      const mapped = Object.keys(this.apiData).map(key => ({ type: key, value: this.apiData[key] }));
      this.apisDisplayData = mapped[0].value;
      console.log(this.apisDisplayData);
    }); 
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    // this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log('This is a test for errors');
  }
}







