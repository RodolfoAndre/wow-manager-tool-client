import {Component, Input, ViewChild} from '@angular/core'
import {MatSort, MatSortModule} from '@angular/material/sort';
import {CommonModule} from "@angular/common";
import {ApiService} from "../shared/api/api.services";
import {MatTableDataSource, MatTableModule,} from "@angular/material/table";
import {EquipmentTableEntry} from "./equipment.model";
import {SharedService} from "../shared/shared.service";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, MatCard, MatToolbar, MatCardContent, MatProgressSpinner, MatIcon, MatTableModule, MatSortModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {

  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = ['isBestInSlot', 'slotName', 'itemLevel', 'name', 'bestInSlotName', 'bestInSlotInstance', 'bestInSlotBossName'];
  dataSource: any;
  loaded: boolean = true;
  getItemLevelColor = SharedService.getItemLevelColor;
  getClassColor = this.sharedService.getCurrentCharClassColor;
  getSelectedChar = this.sharedService.getSelectedCharacter;

  constructor(private apiService: ApiService, private sharedService: SharedService) {

  }

  @Input()
  set id(id: number) {
    this.loaded = false;
    this.apiService.getCharacterById(id).subscribe({
      next: (character) => {
        this.sharedService.setSelectedCharacter(character);
      }
    });
    this.apiService.getEquipmentList(id, true).subscribe( {
      next: (data) => {
        let equipmentTableEntries: Array<EquipmentTableEntry> = data.equipments.map(equipment => EquipmentTableEntry.build(equipment));
        this.dataSource = new MatTableDataSource(equipmentTableEntries);
        this.dataSource.sort = this.sort;
        this.loaded = true;
      },
      error: err => {

      }
    });
  }
}
