import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ApiService} from './shared/api.service';
import {Character} from "./shared/character/character.models";
import {AppComponentConfig} from "./app.models";
import {ExpansionItem} from "./shared/expansion-list/expansion.list.models";
import {SharedService} from "./shared/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {MessagingService} from "./shared/messaging.service";
import {DialogService} from "./shared/dialog/dialog.service";

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, SidenavComponent,
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  componentConfig: AppComponentConfig = {
    title: 'Warcraft Manager Tool',
    showPreLoader: false,
    rightSideNavItems: [],
    leftSideNavItems: this.buildLeftSideNavItems()
  }

  readonly dialog = inject(MatDialog);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private apiService: ApiService,
              private sharedService: SharedService, private messagingService: MessagingService, private dialogService: DialogService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getCharacters();
    this.sharedService.charactersUpdated$.subscribe(() => {
      this.getCharacters();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public getCharacters() {
    this.apiService.getCharacters().subscribe( {
      next: (characters) => {
        this.componentConfig.showPreLoader = false;
        this.componentConfig.rightSideNavItems = this.buildRightSideNavItems(characters);
      },
      error: (error) => {
        this.componentConfig.showPreLoader = false;
        this.messagingService.showError(error);
      }
    });
  }

  private buildLeftSideNavItems() {
    return [
      {
        name: "Mounts",
        path: "mount",
        children: [{
          name: "Drop",
          icon: "pets",
          path: "drop",
          onClick: () => this.sharedService.setNavigationPath(['mount', 'drop'])
        }, {
          name: "List",
          icon: "list",
          path: "list",
          onClick: () => this.sharedService.setNavigationPath(['mount', 'list'])
        }]
      },
      {
        name: "Reputation",
        path: "reputation",
        children: [{
          name: "List",
          icon: "list",
          path: "list",
          onClick: () => this.sharedService.setNavigationPath(['reputation', 'list'])
        }]
      },
      {
        name: "Equipment",
        path: "equipment",
        children: [{
          name: "List",
          icon: "list",
          path: "list",
          onClick: () => this.sharedService.setNavigationPath(['equipment', 'list'])
        }]
      },
      {
        name: "Management",
        path: "management",
        children: [{
          name: "Best In Slots",
          icon: "inventory2",
          path: "bis",
          onClick: () => this.sharedService.setNavigationPath(['management', 'bis'])
        }]
      }];
  }

  private buildRightSideNavItems(characters: Array<Character>) {
    let sideNavBar: Array<ExpansionItem> = [];

    characters.forEach(character => {
      let serverExpansionItem = this.getServerExpansionItem(sideNavBar, character);
      let charListItem = {
        name: character.name,
        icon: "person",
        path: character.id?.toString(),
        model: "CharacterListItem",
        onClick: () => {this.sharedService.setSelectedCharacter(character)},
        customParams: [() => {
          let deleteEvents = {
            confirm: () => {
              if (!character.id) return;
              this.apiService.deleteCharacter(character.id).subscribe({
                next: () => {
                  this.messagingService.showMessage(`${character.name}-${character.server} deleted`);
                  this.getCharacters();
                },
                error: err => {
                  this.messagingService.showError(err);
                }
              });
            }
          };
          this.dialogService.openConfirmDialog(deleteEvents);
        }]
      };
      if (serverExpansionItem) {
        serverExpansionItem.children?.push(charListItem);
      } else {
        sideNavBar.push({
          name: character.server,
          path: undefined,
          children: [charListItem]
        });
      }
    });

    return sideNavBar;
  }

  private getServerExpansionItem(sideNavBar: Array<ExpansionItem>, character: Character) {
    let serverIndex = sideNavBar
      .findIndex((expansionItem) => expansionItem.name === character.server);
    if (serverIndex != undefined && serverIndex >= 0) {
      if (sideNavBar[serverIndex].children === undefined) {
        sideNavBar[serverIndex].children = [];
      }
      return sideNavBar[serverIndex];
    }
    return undefined;
  }
}
