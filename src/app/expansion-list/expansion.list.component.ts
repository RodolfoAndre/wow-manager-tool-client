import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionItem} from "./expansion.list.models";

@Component({
  selector: 'expansion-list',
  templateUrl: 'expansion.list.component.html',
  styleUrls: ['expansion.list.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule],
  standalone: true
})
export class ExpansionListComponent {
  panelState: boolean = false;
  @Input('expansion-items') expansionItems!: Array<ExpansionItem>;
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */