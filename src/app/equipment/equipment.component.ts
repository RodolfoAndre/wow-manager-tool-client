import {Component, Input, ViewChild} from '@angular/core'
import {MatSort, MatSortModule} from '@angular/material/sort';
import {CommonModule} from "@angular/common";
import {ApiService} from "../shared/api.service";
import {MatTableDataSource, MatTableModule,} from "@angular/material/table";
import {EquipmentTableEntry} from "./equipment.model";
import {SharedService} from "../shared/shared.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {Character} from "../shared/character/character.models";
import {MessagingService} from "../shared/messaging.service";
import {MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {PlayableClassResponse, SpecResponse} from "../shared/api.models";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, MatCard, MatToolbar, MatCardContent, MatProgressSpinner, MatIcon, MatTableModule, MatSortModule, MatFormField, MatLabel, MatOption, MatSelect, FormsModule ],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {

  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = ['isBestInSlot', 'slotName', 'itemLevel', 'name', 'bestInSlotName', 'bestInSlotInstance', 'bestInSlotBossName'];
  dataSource: any;
  hasCharacterLoaded: boolean = true;
  selectedChar: Character | undefined;
  getItemLevelColor = SharedService.getItemLevelColor;
  getClassColor = SharedService.getClassColor;
  protected specializations: Array<SpecResponse> | undefined;
  protected loadingSpecialization: boolean = false;
  protected selectedSpecialization: number = 0;

  constructor(private apiService: ApiService, private messagingService: MessagingService) {

  }

  @Input()
  set id(id: number) {
    this.hasCharacterLoaded = false;
    this.apiService.getCharacterById(id).subscribe({
      next: character => {
        this.selectedChar = character;
        this.hasCharacterLoaded = true;
      },
      error: err => {
        this.messagingService.showError(err);
        this.hasCharacterLoaded = true;
      }
    });

    this.loadingSpecialization = true;
    if (this.selectedChar?.classId) {
      this.loadingSpecialization = true;
      this.apiService.getPlayableClassesById(this.selectedChar.classId).subscribe({
        next: (response: PlayableClassResponse) => {
          this.specializations = response.specializations.sort((a, b) => a.name.localeCompare(b.name));
          this.loadingSpecialization = false;
        }, error: (error) => {
          console.error('Error fetching specializations', error);
          this.loadingSpecialization = false;
        }
      });
    }
  }

  onSpecializationChange() {
    if (this.selectedChar && this.selectedChar.id) {
      this.loadingSpecialization = true;
      this.apiService.getEquipmentListWithBis(this.selectedChar.id, this.selectedSpecialization).subscribe({
        next: equipmentResponse => {
          let equipmentTableEntries: Array<EquipmentTableEntry> = equipmentResponse.equipments
            .filter(equipmentResponse => equipmentResponse.slotType.indexOf("1") <= 0 && equipmentResponse.slotType.indexOf("2") <= 0)
            .map(equipment => EquipmentTableEntry.from(equipment));

          equipmentTableEntries = equipmentTableEntries.concat(EquipmentTableEntry.buildForSameSlotType(equipmentResponse.equipments
            .filter(equipmentResponse => equipmentResponse.slotType.indexOf("TRINKET") >= 0)));

          equipmentTableEntries = equipmentTableEntries.concat(EquipmentTableEntry.buildForSameSlotType(equipmentResponse.equipments
            .filter(equipmentResponse => equipmentResponse.slotType.indexOf("FINGER") >= 0)));

          this.dataSource = new MatTableDataSource(equipmentTableEntries);
          this.dataSource.sort = this.sort;
          this.loadingSpecialization = false;
        }, error: err => {
          this.messagingService.showError(err);
          this.loadingSpecialization = false;
        }
      });
    }
  }
}
