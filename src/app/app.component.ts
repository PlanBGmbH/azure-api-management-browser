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
  <div class=" table100 ver1 m-b-110">
  <mat-list role="list">
  <div *ngFor="let el of serviceDisplayData" (click)="getApiList(el)">
      <mat-expansion-panel>
        <mat-expansion-panel-header>

              <div
                style="width:25%; display:inline-block; height:100%;border-left: 1px solid black;border-right: 1px solid black;">
                <mat-card-title>ID: </mat-card-title>
                 {{el?.name}}
                </div>
              
              <div
                style="width:25%; display:inline-block; height:100%;border-left: 1px solid black;border-right: 1px solid black;">
                <mat-card-title>Display Name: </mat-card-title>
                Display Name: {{el?.properties.displayName}}</div>
             
              <div
                style="width:25%; display:inline-block; height:100%;border-left: 1px solid black;border-right: 1px solid black;">
                <mat-card-title>Path: </mat-card-title>
                Path: {{el?.properties.path}}</div>
              

              <div
                style="width:25%; display:inline-block; height:100%;border-left: 1px solid black;border-right: 1px solid black;">
                <mat-card-title>Service Url </mat-card-title>
                Service Url {{el?.properties.serviceUrl}}</div>
         
      

        </mat-expansion-panel-header>
        <br>
        <ng-template matExpansionPanelContent>

          <mat-list role="list">
            <div mdbTableCol *ngFor="let el of apisDisplayData">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <span style="width:25%"> {{el?.properties.method}}</span>
                  <span style="width:75%"> {{el?.properties.urlTemplate}}</span>
                </mat-expansion-panel-header>
                <ng-template matExpansionPanelContent>
                  <mat-card style="border: 3px solid black;">
                    <div style="border: 1px solid black;display: flex;">
                      <div
                        style="width:50%; ; display:inline-block; height:100%;border-left: 1px solid black;border-right: 1px solid       black;">
                        <mat-card-title>Display Name</mat-card-title>
                        {{el?.properties.displayName}}
                      </div>
                      <div
                        style="width:50%;display:inline-block; height:100%; border-left: 1px solid black;border-right: 1px solid  black;">
                        <mat-card-title>Description</mat-card-title>
                        {{el?.properties.description}}
                      </div>
                    </div>
                    <div style="border: 1px solid black;display: flex;">
                      <div
                        style="width:50%;display:inline-block; height:100%; border-left: 1px solid black;border-right: 1px solid  black;">
                        <mat-card-title>Header</mat-card-title>
                        <div *ngFor="let item of el.properties.request?.header">
                          <div>
                            <div>Description: {{item?.description}}</div>
                            <div>Name: {{item?.name}}</div>
                            <div>Type: {{item?.type}}</div>
                          </div>
                        </div>
                      </div>
                      <div
                        style="width:50%;display:inline-block; height:100%; border-left: 1px solid black;border-right: 1px solid black;">
                        <mat-card-title>Query Parameter</mat-card-title>
                        <div *ngFor="let item of el.properties.request?.queryParameters">
                          <div>
                            <div>Description: {{item?.description}}</div>
                            <div>Name: {{item?.name}}</div>
                            <div>Type: {{item?.type}}</div>
                            <span *ngFor="let itm of item.values">
                              <div>Value: {{itm}}</div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </mat-card>
                </ng-template>
              </mat-expansion-panel>
            </div>
          </mat-list>
        </ng-template>
      </mat-expansion-panel>
    </div>
  </mat-list>
</div>

  ` ,
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







