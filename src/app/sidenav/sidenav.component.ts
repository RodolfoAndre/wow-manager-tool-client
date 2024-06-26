import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionListComponent} from "../menu-list/./expansion.list.component";
import {ExpansionItem} from "../menu-list/expansion.list.models";

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule, ExpansionListComponent],
  standalone: true
})
export class SidenavComponent {
  fillerNav : Array<ExpansionItem> = [
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
      name: "Gear",
      path: "gear",
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

  title : string = "Warcraft Manager Tool";
  leftPanelState: boolean = false;
  mobileQuery: MediaQueryList;

  fillerContent = Array(2).fill(0).map(() =>
    `Open side nav, and click on any navigation to close the opened side nav.`);

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


/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
