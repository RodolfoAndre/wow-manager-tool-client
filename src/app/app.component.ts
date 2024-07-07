import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ApiService} from './shared/api/api.services';
import {Character} from "./shared/character/character.models";
import {AppComponentConfig} from "./app.models";
import {ExpansionItem} from "./shared/expansion-list/expansion.list.models";
import {SharedService} from "./shared/shared.service";
import {ThemeService} from "./shared/theme.service";

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, SidenavComponent,
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  componentConfig: AppComponentConfig = {
    title: 'Warcraft Manager Tool',
    showPreLoader: false,
    rightSideNavItems: [],
    leftSideNavItems: this.buildLeftSideNavItems()
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private apiService: ApiService,
              private sharedService: SharedService, private themeService: ThemeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getCharacters();
  }

  ngOnInit() {
    this.themeService.setThemeBasedOnPreference();
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
      error: (erro) => {
        this.componentConfig.showPreLoader = false;
        // this.messagingService.showError(erro);
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
      }];
  }

  private findServersFor(characters: Array<Character>) {
    let servers = characters.map(char => char.server.toLowerCase());
    return new Set(servers);
  }

  private buildRightSideNavItems(characters: Array<Character>) {
    let sideNavBar: Array<ExpansionItem> = [];

    characters.forEach(character => {
      let serverExpansionItem = this.getServerExpansionItem(sideNavBar, character);
      let charListItem = {
        name: character.name,
        icon: "person",
        path: character.id.toString(),
        onClick: () => {this.sharedService.setSelectedCharacter(character)}
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
