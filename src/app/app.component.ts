import { Component } from '@angular/core';
import { apis } from './apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { KeyValuePipe } from '@angular/common';
import { display_data } from './display_data';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, of } from 'rxjs';



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
   <tr mdbTableCol *ngFor="let el of displayData">
     <th scope="row">{{el.name}}</th>
     <td>{{el.properties.displayName}}</td>
     <td>{{el.properties.path}}</td>
     <td>{{el.properties.serviceUrl}}</td>
   </tr>
 </tbody>
</table>

<mat-table #table [dataSource]="dataSource">

    <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <mat-header-cell *matHeaderCellDef> name </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.name}}
      </mat-cell>
    </ng-container>

    <!-- Id Column -->
    <ng-container matColumnDef="id">
      <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
      <mat-cell *matCellDef="let element" (click)="cellClicked(element)"> {{element.id}} </mat-cell>
    </ng-container>

    <!-- Path Column -->
    <ng-container matColumnDef="path">
      <mat-header-cell *matHeaderCellDef> path </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.path}} 333</mat-cell>
    </ng-container>

    <!-- Service Url Column -->
    <ng-container matColumnDef="serviceUrl">
      <mat-header-cell *matHeaderCellDef> serviceUrl </mat-header-cell>
      <mat-cell *matCellDef="let element"> {{element.serviceUrl}} </mat-cell>
    </ng-container>

    <!-- The exapnded row contents-->
    <!-- Expanded Content Column - The detail row is made up of this one column -->
    <ng-container matColumnDef="expandedDetail">
      <mat-cell *matCellDef="let detail">
        Maaz
      </mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <!-- <mat-row (click)="test()" *matRowDef="let row; columns: displayedColumns;"></mat-row> -->
    <mat-row *matRowDef="let row; columns: displayedColumns;"

            class="element-row"
            [class.expanded]="expandedElement == row"
            (click)="expandedElement = row"></mat-row>
    <mat-row *matRowDef="let row; columns: ['expandedDetail']; when: isExpansionDetailRow"
            [@detailExpand]="row.element == expandedElement ? 'expanded' : 'collapsed'"
            style="overflow: hidden">
    </mat-row>

  </mat-table>
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

  dataSource = new ExampleDataSource();


  elements: apis;
  displayData: apis[];

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;


  cellClicked(element) {
    console.log(element.name + ' cell clicked');
  }

  formatData() {


  }

  constructor(private service: HttpService) { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.service.getCharacters().subscribe(data => {
      this.elements = data;
      this.writeValueToArray();
    });


    // this.displayedColumns = ['id', 'displayName', 'description', 'path'];

  }
  writeValueToArray() {
    const mapped = Object.keys(this.elements).map(key => ({ type: key, value: this.elements[key] }));
    this.displayData = mapped[0].value;

    // for (let index = 0; index < this.displayData.length; index++) {
    //   const element = this.displayData[index];
    // }
    for (const iterator of this.displayData) {
      const element = iterator;
      console.log(element);
      const obj = new display_data(iterator.name, iterator.id, iterator.properties.path, iterator.properties.serviceUrl);
      ELEMENT_DATA.push(obj);
    }
    this.observ = new ExampleDataSource();
    console.log(ELEMENT_DATA);
  }


}
export class ExampleDataSource extends DataSource<any> {
  connect(): Observable<Element[]> {
    const rows = [];
    ELEMENT_DATA.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }
}





