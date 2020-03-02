import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BrowserHelper} from '../browser-helper';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  loggedInInfo: Subscription;
  buttonItems: MenuItem[];
  isIE: boolean;
  username: string;
  loggedIn: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.items = [
      // {
      //   label: 'Case editor',
      //   icon: 'pi pi-fw pi-pencil',
      //   routerLink: ['caseeditor']
      // },
      {
        label: 'Case Law',
        icon: 'pi pi-fw pi-file ',
        routerLink: ['caselist']
      },
      {
        label: 'Legislation',
        icon: 'pi pi-fw pi-file ',
        routerLink: ['metalist']
      },
      {
        label: 'Transposition tables',
        icon: 'pi pi-fw pi-file ',
        routerLink: ['transposition']
      },
      {
        label: 'Expert Materials',
        icon: 'pi pi-fw pi-file ',
        routerLink: ['expertlist']
      }

      // {
      //   label: 'Home',
      //   icon: 'pi pi-fw pi-cog',
      //   routerLink: ['home'],
      // }
    ];

    this.isIE = BrowserHelper.checkBrowser();

    this.loggedInInfo = this.auth.getLoggedInStatus().subscribe(flag => {
      this.items = this.items.filter(x => x.label !== 'Admin');
      if (flag) {
        this.username = this.auth.getUsername();
        this.buttonItems = [];

        // dropdown btns
        const userBtn = {label: this.username, icon: 'pi pi-user'};
        const passBtn: MenuItem = {label: 'Change Password', icon: 'pi pi-key', routerLink: ['edit']};

        this.buttonItems.push(userBtn, passBtn);

        this.loggedIn = true;
        if (this.auth.isAdmin()) {
          // this.items.push({label: 'Admin', routerLink: ['admin']});
          const adminBtn: MenuItem = {label: 'Admin', icon: 'pi pi-key', routerLink: ['admin']};
          if (this.buttonItems.find(x => x.label === 'Admin') == null) {
            this.buttonItems.push(adminBtn);
          }
        }
        const helpBtn:  MenuItem = {label: 'Help', routerLink: ['help'], icon: 'pi pi-file'};
        this.buttonItems.push(helpBtn);
        // logout
        const logoutBtn: MenuItem = {
          label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout()
        };
        this.buttonItems.push(logoutBtn);

        // this.addHelpButton();
      } else {
        this.username = 'Anonymous';
        this.loggedIn = false;

        const passBtn: MenuItem = {
          label: 'Change Password', icon: 'pi pi-key', routerLink: ['edit']
        };
        // this.buttonItems.push(passBtn);
      }
    });
  }

  changePass() {
    this.router.navigate(['edit']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.loggedInInfo.unsubscribe();
  }

  private addHelpButton() {
    if (!this.items.find(x => x.label === 'Help')) {
      this.items.push({label: 'Help', routerLink: ['help']});
    }

    const indexAdmin = this.items.findIndex(x => x.label === 'Admin');  // subscription messes link order, so fixing here
    const indexHelp = this.items.findIndex(x => x.label === 'Help');
    if (indexHelp < indexAdmin) {
      const temp = this.items[indexAdmin];
      this.items[indexAdmin] = this.items[indexHelp];
      this.items[indexHelp] = temp;
    }
  }
}
