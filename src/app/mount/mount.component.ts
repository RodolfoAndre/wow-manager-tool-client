import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatToolbar} from "@angular/material/toolbar";
import {Character} from "../shared/character/character.models";
import {SharedService} from "../shared/shared.service";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {MountResponse} from "./mount.model";

@Component({
  selector: 'app-mount',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatList, MatListItem, MatProgressBar, MatProgressSpinner, MatToolbar],
  templateUrl: './mount.component.html',
  styleUrl: './mount.component.scss'
})
export class MountComponent {
  hasCharacterLoaded: boolean = false;
  selectedCharacter?: Character;
  mounts? : Array<MountResponse>;
  getClassColor = SharedService.getClassColor;

  constructor(private apiService: ApiService, private messagingService: MessagingService, private sharedService: SharedService) {

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

    this.apiService.getMountList(id).subscribe( {
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
