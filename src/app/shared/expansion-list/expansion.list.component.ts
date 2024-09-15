import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionItem} from "./expansion.list.models";
import {Router, RouterLink} from "@angular/router";
import {SharedService} from "../shared.service";
import {CharacterListItemComponent} from "../../character-list-item/character-list-item.component";

@Component({
  selector: 'expansion-list',
  templateUrl: 'expansion.list.component.html',
  styleUrls: ['expansion.list.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule, RouterLink, CharacterListItemComponent],
  standalone: true
})
export class ExpansionListComponent {
  panelState: boolean = false;
  @Input('expansion-items') expansionItems!: Array<ExpansionItem>;

  constructor(private sharedService: SharedService, private router: Router) {
  }

  findPath(parentPath: string | undefined, childPath: string | undefined): (string | undefined)[] {
    return [this.findParentPath(parentPath), childPath];
  }

  findParentPath(parentPath: string | undefined): string {
    if (parentPath !== undefined && parentPath !== null) {
      return parentPath;
    }

    let navigationPath = this.sharedService.getNavigationPath();
    if (navigationPath !== undefined && navigationPath !== null) {
      return navigationPath;
    }

    let urlSegments = this.router.url.split('/');
    urlSegments.pop();
    return urlSegments.join('/');

  }
}
