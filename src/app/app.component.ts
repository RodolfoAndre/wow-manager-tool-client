import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ExpansionItem} from "./expansion-list/expansion.list.models";
import {CommonModule, NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, SidenavComponent,
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'Warcraft Manager Tool';
  rightSideNavItems : Array<ExpansionItem> = [];




  fillerContent = Array(2).fill(0).map(() =>
    `Open side nav, and click on any navigation to close the opened side nav.`);
  leftSideNavItems : Array<ExpansionItem> = [
    {
      name: "Mounts",
      path: "mount",
      children: [{
        name: "Drop",
        icon: "pets",
        path: "drop"
      }, {
        name: "List",
        icon: "list",
        path: "list"
      }]
    },
    {
      name: "Reputation",
      path: "reputation",
      children: [{
        name: "List",
        icon: "list",
        path: "list"
      }]
    },
    {
      name: "Equipment",
      path: "equipment",
      children: [{
        name: "List",
        icon: "list",
        path: "list"
      }]
    },
    {
      name: "Achievement",
      path: "achievement",
      children: [{
        name: "List",
        icon: "list",
        path: "list"
      }]
    }];

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
