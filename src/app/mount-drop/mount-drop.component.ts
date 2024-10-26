import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {Character} from "../shared/character/character.models";
import {SharedService} from "../shared/shared.service";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {MountDropResponse} from "../shared/api.models";
import {ChatService} from "../shared/chart.service";

@Component({
  selector: 'app-mount-drop',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatList,
    MatListItem,
    MatProgressSpinner,
    MatToolbar,
    NgClass,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatIcon,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader
  ],
  templateUrl: './mount-drop.component.html',
  styleUrl: './mount-drop.component.scss'
})
export class MountDropComponent {
  hasCharacterLoaded: boolean = false;
  selectedCharacter?: Character;
  getClassColor = SharedService.getClassColor;
  mounts: Array<MountDropResponse> = [];

  panelState : Array<boolean> = [];
  isRender : Array<boolean> = [];

  constructor(private apiService: ApiService,
              private sharedService: SharedService,
              private messagingService: MessagingService,
              private chartService: ChatService) {
  }

  @Input()
  set id(id: string) {
    this.hasCharacterLoaded = false;
    this.apiService.getCharacterById(id).subscribe({
      next: character => {
        this.selectedCharacter = character;
      },
      error: err => {
        this.messagingService.showError(err);
      }
    });

    this.apiService.getMountsDrop(id).subscribe( {
      next: mountListResponse => {
        this.mounts = mountListResponse.mounts;
        this.hasCharacterLoaded = true;

        this.sharedService.sortByName(this.mounts);
      },
      error: err => {
        this.messagingService.showError(err);
        this.hasCharacterLoaded = true;
      }
    });
  }

  startChart(i: number, mount: any) {
    if (this.panelState[i] && !this.isRender[i]) {
      this.chartService.buildChart(mount);
      this.isRender[i] = true;
    }
    return true;
  }

  openItem(index: number) {
    this.panelState[index] = true;
  }

  closeItem(index: number) {
    this.panelState[index] = false;
    this.isRender[index] = false;
  }

  twoDecimals(number : number) : number {
    return Math.round(number * 100) / 100;
  }

  getChartId(name: string) {
    return this.chartService.getChartId(name);
  }
}
