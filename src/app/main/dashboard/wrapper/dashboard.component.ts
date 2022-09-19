import {  Component, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Subscription } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent   {
    
  items: MenuItem[]  = [];
  value: number = 10;
  public menuInactiveDesktop!: boolean;

  public menuActiveMobile!: boolean;

  public overlayMenuActive!: boolean;

  public staticMenuInactive: boolean = false;

  public profileActive!: boolean;

  public topMenuActive!: boolean;

  public topMenuLeaving!: boolean;

  public theme!: string;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };
  documentClickListener!: () => void;

  menuClick!: boolean;

  topMenuButtonClick!: boolean;

  configActive!: boolean;

  configClick!: boolean;



  subscription!: Subscription;
  constructor(public renderer: Renderer2, public app: AppComponent) { }
 

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            }
        ];
    }
    
  ngAfterViewInit() {
    // hides the overlay menu and top menu if outside is clicked
    this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
        if (!this.isDesktop()) {
            if (!this.menuClick) {
                this.menuActiveMobile = false;
            }

            if (!this.topMenuButtonClick) {
                this.hideTopMenu();
            }
        }
        else {
            if (!this.menuClick && this.isOverlay()) {
                this.menuInactiveDesktop = true;
            }
            if (!this.menuClick){
                this.overlayMenuActive = false;
            }
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.menuClick = false;
        this.topMenuButtonClick = false;
    });
}

toggleMenu(event: Event) {
    this.menuClick = true;
    console.log(event);
    if (this.isDesktop()) {
        if (this.app.menuMode === 'overlay') {
            if(this.menuActiveMobile === true) {
                this.overlayMenuActive = true;
            }

            this.overlayMenuActive = !this.overlayMenuActive;
            this.menuActiveMobile = false;
        }
        else if (this.app.menuMode === 'static') {
            this.staticMenuInactive = !this.staticMenuInactive;
        }
    }
    else {
        this.menuActiveMobile = !this.menuActiveMobile;
        this.topMenuActive = false;
    }

    event.preventDefault();
}

toggleProfile(event: Event) {
    this.profileActive = !this.profileActive;
    event.preventDefault();
}

toggleTopMenu(event: Event) {
    this.topMenuButtonClick = true;
    this.menuActiveMobile = false;

    if (this.topMenuActive) {
        this.hideTopMenu();
    } else {
        this.topMenuActive = true;
    }

    event.preventDefault();
}

hideTopMenu() {
    this.topMenuLeaving = true;
    setTimeout(() => {
        this.topMenuActive = false;
        this.topMenuLeaving = false;
    }, 1);
}

onMenuClick() {
    this.menuClick = true;
}

// onConfigClick(event) {
//     this.configClick = true;
// }

isStatic() {
    return this.app.menuMode === 'static';
}

isOverlay() {
    return this.app.menuMode === 'overlay';
}

isDesktop() {
    return window.innerWidth > 992;
}

isMobile(){
    return window.innerWidth < 1024;
}

onSearchClick() {
    this.topMenuButtonClick = true;
}

ngOnDestroy() {
    if (this.documentClickListener) {
        this.documentClickListener();
    }


    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}


}
