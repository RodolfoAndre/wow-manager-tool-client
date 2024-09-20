import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  BestInSlotsResponse,
  BestsInSlotsRequest,
  SpecializationResponse,
  SpecializationsResponse
} from "../shared/api.models";
import {MatOption} from "@angular/material/autocomplete";
import {ApiService} from "../shared/api.service";
import {MatInput} from "@angular/material/input";
import {MatFabButton} from "@angular/material/button";
import {MessagingService} from "../shared/messaging.service";

@Component({
  selector: 'app-best-in-slot-manager',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatProgressSpinner, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, MatToolbar, NgClass, NgIf, MatFormField, MatSelect, MatOption, MatLabel, FormsModule, MatInput, MatFabButton],
  templateUrl: './best-in-slot-manager.component.html',
  styleUrl: './best-in-slot-manager.component.scss'
})
export class BestInSlotManagerComponent {
  selectedSpecialization: number | undefined;
  specializations: Array<SpecializationResponse> = [];
  loadingPage: boolean = true;
  itemsIds: string = '';
  loadingSpecialization: boolean = false;
  bis?: BestInSlotsResponse;


  constructor(private apiService: ApiService, private messagingService: MessagingService) {
    this.apiService.getSpecializations().subscribe({
      next: (response: SpecializationsResponse) => {
        this.specializations = response.specializations.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.loadingPage = false;
      }, error: (error) => {
        console.error('Error fetching specializations', error);
        this.loadingPage = false;
      }
    });
  }

  onSpecializationChange($event: MatSelectChange) {
    this.loadingSpecialization = true;
    this.apiService.getBestInSlots($event.value).subscribe({
      next: (response: BestInSlotsResponse) => {
        this.bis = response;
        this.loadingSpecialization = false;

        const getUniqueIds = (array: Array<any>, key: string): string => {
          return Array.from(new Set(array.filter(item => item[key]).map(item => item[key])))
            .sort((a, b) => a - b)
            .join(',');
        };

        this.itemsIds = getUniqueIds(response.bestInSlots, 'blizzardId');
      }, error: (error) => {
        console.error('Error fetching specializations', error);
        this.loadingSpecialization = false;
      }
    });
  }

  onSave() {
    if (this.selectedSpecialization) {
      let request : BestsInSlotsRequest = {
        id: this.bis?.id,
        specId: this.selectedSpecialization,
        bestInSlotsIds: this.getItemsIdsArray()
      }

      this.apiService.saveSpecializationBis(request).subscribe({
        next: () => {
          this.messagingService.showMessage("Bests in slots updated");
        },
        error: (error) => {
          this.messagingService.showError(error);
        }
      });
    }
  }

  private getItemsIdsArray(): number[] {
    return this.itemsIds
      .split(',')
      .map(id => parseInt(id, 10))
      .filter(id => !isNaN(id));
  }
}
