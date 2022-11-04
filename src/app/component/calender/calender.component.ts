import { Component, OnInit } from '@angular/core';
import {
  DayService,
  MonthService,
  AgendaService,
  EventSettingsModel,
} from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  providers: [DayService, MonthService, AgendaService],
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date();
  public readonly: boolean = true;
  public url:any = "https://api-taskeasy.herokuapp.com/v1/tasks/all/tasks"
  // public url:any = "http://127.0.0.1:3000/v1/tasks/all/tasks"
  authToken = localStorage.getItem('authToken');
  reqHeader =[{
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(this.authToken!),
      }];

  private dataManager: DataManager = new DataManager({
    url: this.url,
    adaptor: new ODataV4Adaptor(),
    headers: this.reqHeader
  });
 
  
  constructor() {
    console.log(this.dataManager)
  }
  
  ngOnInit(): void {
    
  }
  public eventSettings: EventSettingsModel = {
    dataSource:  this.dataManager,
    fields: {
      subject: { title: 'Event Name', name: 'title', default: 'Add Name' },
      description: { title: 'Summary', name: 'title' },
      startTime: { title: 'From', name: 'scheduled_date' },
      endTime: { title: 'To', name: 'scheduled_date' },
    },
  };

}
