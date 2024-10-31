import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpansionListComponent} from "../expansion-list/expansion.list.component";
import {ExpansionItem} from "../expansion-list/expansion.list.models";
import {DialogService} from "../dialog/dialog.service";
import {ApiService} from "../api.service";
import {MessagingService} from "../messaging.service";
import {SharedService} from "../shared.service";
import {retry} from "rxjs";

/** @title Responsive sidenav */
@Component({
  selector: 'side-nav-component',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, MatExpansionModule, ExpansionListComponent],
  standalone: true
})
export class SidenavComponent implements OnDestroy, OnInit {
  @Input('left-side-nav-items') leftNavItems!: Array<ExpansionItem>;
  @Input('right-side-nav-items') rightNavItems!: Array<ExpansionItem>;

  leftPanelOpened: boolean = false;
  rightPanelOpened: boolean = false;
  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dialogService: DialogService,
              private apiService: ApiService, private messagingService: MessagingService, private sharedService: SharedService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.leftPanelOpened = false;
    this.rightPanelOpened = false;
    if (!this.mobileQuery.matches) {
      this.leftPanelOpened = true;
      this.rightPanelOpened = true;
    }
  }

  toggleLeft() {
    this.leftPanelOpened = !this.leftPanelOpened;
  }

  toggleRight() {
    this.rightPanelOpened = !this.rightPanelOpened;
  }

  isEmpty(items: any[]) {
    return items == undefined || items.length == 0;
  }

  protected onAddNewCharacterClick() {
    this.dialogService.openAddNewCharacterDialog({
      confirm: (character) => {
        this.apiService.createChar(character).subscribe({
          next: () => {
            this.messagingService.showMessage("Saved successfully");
            this.sharedService.notifyCharactersUpdated();
          },
          error: err => {
            this.messagingService.showError(err.error);
          }
        });
      }
    });
  }

  protected readonly retry = retry;
}
