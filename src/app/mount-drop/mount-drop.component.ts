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
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {Character} from "../shared/character/character.models";
import {SharedService} from "../shared/shared.service";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {MountDropResponse} from "../shared/api.models";

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
    MatExpansionPanelDescription
  ],
  templateUrl: './mount-drop.component.html',
  styleUrl: './mount-drop.component.scss'
})
export class MountDropComponent {
  hasCharacterLoaded: boolean = false;
  selectedCharacter?: Character;
  getClassColor = SharedService.getClassColor;
  private mounts: Array<MountDropResponse> = [];

  constructor(private apiService: ApiService, private sharedService: SharedService, private messagingService: MessagingService) {
  }

  @Input()
  set id(id: number) {
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
}
