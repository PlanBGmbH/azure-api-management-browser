import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  template: `
  <p>
  <mat-toolbar color="primary">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <span>PlanB API Management Portal</span>
    <span class="example-spacer"></span>
    <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
      <mat-icon>share</mat-icon>
    </button>
  </mat-toolbar>
 </p>

 <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

 <!--- Note that these columns can be defined in any order.
       The actual rendered columns are set as a property on the row definition" -->

 <!-- Position Column -->
 <ng-container matColumnDef="position">
   <th mat-header-cell *matHeaderCellDef> No. </th>
   <td mat-cell *matCellDef="let element"> {{element.position}} </td>
 </ng-container>

 <!-- Name Column -->
 <ng-container matColumnDef="name">
   <th mat-header-cell *matHeaderCellDef> Name </th>
   <td mat-cell *matCellDef="let element"> {{element.name}} </td>
 </ng-container>

 <!-- Weight Column -->
 <ng-container matColumnDef="weight">
   <th mat-header-cell *matHeaderCellDef> Weight </th>
   <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
 </ng-container>

 <!-- Symbol Column -->
 <ng-container matColumnDef="symbol">
   <th mat-header-cell *matHeaderCellDef> Symbol </th>
   <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
 </ng-container>

 <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
 <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
  ` ,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'azure-api-management-browser';

  jsonStringArray: any;
  displayedColumns: string[];
  displayData: string[];
  dataSource = this.displayData;

  constructor() {
    console.log(this.jsonStringArray);

    this.jsonStringArray = Object.keys(elements).map(e => elements[e]);
    this.displayedColumns = ['position', 'name', 'weight', 'symbol'];

    for (let index = 0; index < this.jsonStringArray.length; index++) {
      let val = Object.keys(this.jsonStringArray).map(index => this.jsonStringArray[index]);
      console.log(val);

      for (let index = 0; index < this.jsonStringArray.length; index++) {
        let tmp = Object.keys(val).map(index => val[index]);
        console.log(tmp);

      }
    }
  }


}
