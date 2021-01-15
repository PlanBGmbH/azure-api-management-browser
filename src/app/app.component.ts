import { Display_data } from './Models/Model.Display_data';
import { PageModel } from './Models/PageModel';
import { Component, Injectable, OnInit } from '@angular/core';
import { Service } from './Models/Model.Service';
import { Apis } from './Models/Model.Apis';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './Service/http.service';
import { KeyValuePipe } from '@angular/common';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApisProperties } from './Models/Model.ApisProperties';
import { ErrorHandler } from '@angular/core';
import { map } from 'rxjs/operators';
import { Stages } from './Stages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // templateUrl: './mat-table-component/mat-table-component.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class AppComponent implements OnInit {

  apisDisplayData: Apis[];

  isWait = false;
  isWaitApies = false;

  pages: PageModel[] = [];

  pagesize = 2;

  $ServicestoDisplay: BehaviorSubject<Service[]>;

  activeStage: Stages = Stages.production;

  SelectStages = Stages;

  selectedPageIndex = 0;

  selectedApiId = '';

  setStep(index: number) {
    this.selectedPageIndex = index;
    this.DisplayData(this.pages[index]);
    this.selectedApiId = '';
  }

  nextStep() {
    this.selectedPageIndex++;
    this.selectedApiId = '';
  }

  prevStep() {
    this.selectedPageIndex--;
    this.selectedApiId = '';
  }


  constructor(private service: HttpService) { }

  ngOnInit() {
    this.$ServicestoDisplay = new BehaviorSubject<Service[]>(null);
    this.InitializePages();
  }

  InitializePages()  {
    this.service.getListByService(this.activeStage, 0).then(data => {
      this.pages = [];
      this.selectedPageIndex = 0;
      this.selectedApiId = '';
      for (let i = 0; i < data.count; i += this.pagesize) {
          this.pages.push(new PageModel(i / this.pagesize, i === 0 ? data.value : null));
      }
      this.DisplayData(this.pages[0]);
    });
  }

  async getPageServices(pageIndex) {
    this.isWait = true;
    const apis = await this.service.getListByService(this.activeStage, pageIndex);
    this.isWait = false;
  }
  getApiList(service: Service) {
    this.selectedApiId = service.id;
    this.service.getListByApi(service.name, this.activeStage).subscribe(data => {
      const mapped = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      this.apisDisplayData = mapped[0].value;
      this.isWaitApies = true;
    });
  }

  onChange() {

    this.InitializePages();
  }

   DisplayData(page: PageModel) {
        this.isWait = true;
        this.service.getListByService(this.activeStage, page.index).then(data => {
          return data.value;
        }).then(value => this.$ServicestoDisplay.next(value));
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log('This is a test for errors');
  }
}









