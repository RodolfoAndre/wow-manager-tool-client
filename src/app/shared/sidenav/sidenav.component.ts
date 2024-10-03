import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionListComponent} from "../expansion-list/expansion.list.component";
import {ExpansionItem} from "../expansion-list/expansion.list.models";

/** @title Responsive sidenav */
@Component({
  selector: 'side-nav-component',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule, ExpansionListComponent],
  standalone: true
})
export class SidenavComponent implements OnDestroy{
  @Input('left-side-nav-items') leftNavItems!: Array<ExpansionItem>;
  @Input('right-side-nav-items') rightNavItems!: Array<ExpansionItem>;

  leftPanelOpened: boolean = (this.leftNavItems == undefined || this.leftNavItems.length == 0);
  rightPanelOpened: boolean = (this.rightNavItems == undefined || this.rightNavItems.length == 0);
  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleLeft() {
    this.leftPanelOpened = !this.leftPanelOpened;
  }

  toggleRight() {
    this.rightPanelOpened = !this.rightPanelOpened;
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
