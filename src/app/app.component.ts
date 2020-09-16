import { Component } from '@angular/core';
import { apis } from './apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { KeyValuePipe } from '@angular/common';
import { display_data } from './display_data';


let ELEMENT_DATA: display_data[] = [];

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
   <tr mdbTableCol *ngFor="let el of displayData">
     <th scope="row">{{el.name}}</th>
     <td>{{el.properties.displayName}}</td>
     <td>{{el.properties.path}}</td>
     <td>{{el.properties.serviceUrl}}</td>
   </tr>
 </tbody>
</table>






<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.id}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.properties.path}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef> Symbol </th>
    <td mat-cell *matCellDef="let element"> {{element.properties.serviceUrl}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
  ` ,
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  elements: apis;
  displayedColumns: string[];
  displayData: apis[];
  constructor(private service: HttpService) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.service.getCharacters().subscribe(data => {
      this.writeValueToArray(data);
    });


    // this.displayedColumns = ['id', 'displayName', 'description', 'path'];

  }
  writeValueToArray(data: apis) {
    const mapped = Object.keys(data).map(key => ({ type: key, value: data[key] }));
    this.displayData = mapped[0].value;

    // for (let index = 0; index < this.displayData.length; index++) {
    //   const element = this.displayData[index];
    // }
    for (const iterator of this.displayData) {
      const element = iterator;
      console.log(element);
      const obj = new display_data(iterator.name, iterator.id, iterator.properties.path,
        iterator.properties.serviceUrl);
      ELEMENT_DATA.push(obj);
    }

    console.log(ELEMENT_DATA);
  }


}





