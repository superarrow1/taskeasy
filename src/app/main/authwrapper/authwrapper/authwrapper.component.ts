import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { getErrorMessage, getLoading } from 'src/app/app-store/Shared/shared.selector';

@Component({
  selector: 'app-authwrapper',
  templateUrl: './authwrapper.component.html',
  styleUrls: ['./authwrapper.component.css']
})
export class AuthwrapperComponent implements OnInit {
  showLoading$:Observable<boolean> | undefined

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
   
  }

}
