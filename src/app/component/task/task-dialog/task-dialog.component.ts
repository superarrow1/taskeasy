import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface Status {
  task_status: string;
  code: string;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDialogComponent implements OnInit {
  @Input('data') data!: any;
  @Input('status') status!: Status[];
  @Input('subtaskele') subtaskele!: string;
  selectedDate: any = new Date();
  minimumDate: any = new Date();

  public badgeData: Object[] = [
    { code: 'low', badge: 'Low' },
    { code: 'medium', badge: 'Medium' },
    { code: 'high', badge: 'High' },
  ];
  subTask: any = [];

  constructor() {}

  ngOnInit(): void {}
  newObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const objectId =
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, () => {
          return Math.floor(Math.random() * 16).toString(16);
        })
        .toLowerCase();

    return objectId;
  }
  addSubTask(data: any, stask: any) {
    if (stask == '' || stask == null) {
      return;
    } else {
      const newstask = {
        stitle: stask,
        checked: false,
        _id: this.newObjectId(),
      };
      this.data.subtasklist = [...this.data.subtasklist, newstask];
      this.subtaskele = '';
    }
  }
  removeSubTask(subtaskId) {
    this.data.subtasklist = this.data.subtasklist.filter(
      (subTask) => subtaskId != subTask._id
    );
  }
}
