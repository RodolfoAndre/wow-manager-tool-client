import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass} from "@angular/common";
import {Character} from "../shared/character/character.models";
import {SharedService} from "../shared/shared.service";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {MatList, MatListItem} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ReputationResponse} from "./reputation.models";

@Component({
  selector: 'app-reputation',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    MatToolbar,
    NgClass,
    MatListItem,
    MatList,
    MatProgressBar
  ],
  templateUrl: './reputation.component.html',
  styleUrl: './reputation.component.scss'
})
export class ReputationComponent {
  hasCharacterLoaded: boolean = false;
  selectedCharacter?: Character;
  reputations? : Array<ReputationResponse>;
  getClassColor = SharedService.getClassColor;

  constructor(private apiService: ApiService, private messagingService: MessagingService, private sharedService: SharedService) {
  }

  @Input()
  set id(id: string) {
    this.hasCharacterLoaded = false;
    this.apiService.getCharacterById(id).subscribe({
      next: (character) => {
        this.selectedCharacter = character;
      },
      error: err => {
        this.messagingService.showError(err);
      }
    });

    this.apiService.getReputationList(id).subscribe( {
      next: reputationListResponse => {
        this.reputations = reputationListResponse.reputations;

        this.sharedService.sortByName(this.reputations);
        this.hasCharacterLoaded = true;
      },
      error: err => {
        this.messagingService.showError(err);
        this.hasCharacterLoaded = true;
      }
    });
  }

  getProgressbarValue(rep: ReputationResponse) {
    if (rep.current == rep.max) {
      return 100;
    }

    return (rep.current / rep.max) * 100
  }
}
