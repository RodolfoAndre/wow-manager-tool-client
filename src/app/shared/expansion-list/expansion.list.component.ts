import {Component, Input} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionItem} from "./expansion.list.models";
import {RouterLink} from "@angular/router";
import {SharedService} from "../shared.service";

@Component({
  selector: 'expansion-list',
  templateUrl: 'expansion.list.component.html',
  styleUrls: ['expansion.list.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule, RouterLink],
  standalone: true
})
export class ExpansionListComponent {
  panelState: boolean = false;
  @Input('expansion-items') expansionItems!: Array<ExpansionItem>;

  constructor(private sharedService: SharedService) {
  }

  findPath(parentPath: string | undefined, childPath: string | undefined): (string | undefined)[] {
    if (parentPath === undefined || parentPath === null) {
      return [this.sharedService.getNavigationPath(), childPath];
    }
    return [parentPath, childPath];
  }
}
