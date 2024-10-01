import {Component, ViewChild} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {NgClass, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  BestInSlotResponse,
  BestInSlotsResponse,
  BestsInSlotsRequest, EquipmentResponse,
  PlayableClassesResponse,
  PlayableClassResponse,
  SpecializationResponse
} from "../shared/api.models";
import {MatOption} from "@angular/material/autocomplete";
import {ApiService} from "../shared/api.service";
import {MatInput} from "@angular/material/input";
import {MatButton, MatFabAnchor, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MessagingService} from "../shared/messaging.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";
import {DialogService} from "../shared/dialog/dialog.service";
import {AddBestInSlotDialogComponent} from "../add-best-in-slot-dialog/add-best-in-slot-dialog.component";
import {EquipmentSearchTableEntry} from "../add-best-in-slot-dialog/add-best-in-slot-dialog.models";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-best-in-slot-manager',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatProgressSpinner, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, MatToolbar, NgClass, NgIf, MatFormField, MatSelect, MatOption, MatLabel, FormsModule, MatInput, MatFabButton, MatTabGroup, MatTab, MatHeaderCellDef, MatTableModule, MatSortModule, MatFabAnchor, RouterLink, MatCheckbox, MatButton, MatMiniFabButton],
  templateUrl: './best-in-slot-manager.component.html',
  styleUrl: './best-in-slot-manager.component.scss'
})
export class BestInSlotManagerComponent {

  @ViewChild(MatSort) sort: MatSort | null = null;
  selectedSpecialization: number | undefined;
  specializations: Array<SpecializationResponse> = [];
  classes: Array<PlayableClassResponse> = [];
  loadingPage: boolean = true;
  itemsIds: string = '';
  loadingSpecialization: boolean = false;
  bis?: BestInSlotsResponse;
  selectedClass: number | undefined;
  savingBis: boolean = false;
  displayedColumns: string[] = ['slotType', 'name', 'instanceName', 'bossName', 'action'];
  equipments: BestInSlotResponse[] = [];
  dataSource: MatTableDataSource<BestInSlotResponse> = new MatTableDataSource(this.equipments);

  constructor(private apiService: ApiService, private messagingService: MessagingService, private dialogService: DialogService) {
    this.apiService.getPlayableClasses().subscribe({
      next: (response: PlayableClassesResponse) => {
        this.classes = response.classes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.loadingPage = false;
      }, error: (error) => {
        console.error('Error fetching classes', error);
        this.loadingPage = false;
      }
    });
  }

  onClassChange($event: MatSelectChange) {
    this.loadingSpecialization = true;
    this.selectedSpecialization = undefined;
    this.apiService.getPlayableClassesById($event.value).subscribe({
      next: (response: PlayableClassResponse) => {
        this.specializations = response.specializations.sort((a, b) => a.name.localeCompare(b.name));
        this.loadingSpecialization = false;
      }, error: (error) => {
        console.error('Error fetching specializations', error);
        this.loadingSpecialization = false;
      }
    });
  }

  onSpecializationChange(selectedSpecialization: number | undefined) {
    if (selectedSpecialization === undefined) {
      this.messagingService.showMessage("Specialization not provided");
      return;
    }

    this.loadingSpecialization = true;
    this.apiService.getBestInSlots(selectedSpecialization).subscribe({
      next: (response: BestInSlotsResponse) => {
        this.bis = response;
        this.loadingSpecialization = false;

        this.equipments.splice(0, this.equipments.length);
        this.equipments.push(...response.bestInSlots);

        this.dataSource.sort = this.sort;

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

      this.savingBis = true;
      this.apiService.saveSpecializationBis(request).subscribe({
        next: () => {
          this.savingBis = false;
          this.messagingService.showMessage("Bests in slots updated");
          this.onSpecializationChange(this.selectedSpecialization);
        },
        error: (error) => {
          this.savingBis = true;
          this.messagingService.showError(error);
        }
      });
    }
  }

  private getItemsIdsArray(): number[] {
    return this.equipments
      .map(equipment => equipment.blizzardId);
  }

  openAddBisDialog() {
    let onClose = (response: any) => {
      let bestInSlots: BestInSlotResponse[] = response.map((equipment: EquipmentSearchTableEntry) => {
        return {
          blizzardId: equipment.id,
          name: equipment.name,
          slotType: equipment.slotType
        };
      });

      this.equipments.push(...bestInSlots);
      this.dataSource.data = this.equipments;
    }
    this.dialogService.openDialog(AddBestInSlotDialogComponent, onClose);
  }

  delete(element: BestInSlotResponse) {
    const index = this.equipments.indexOf(element);
    if (index >= 0) {
      this.equipments.splice(index, 1);
      this.dataSource.data = this.equipments;
    }
  }
}
