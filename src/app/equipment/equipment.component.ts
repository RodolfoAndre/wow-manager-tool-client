import {Component, Input, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ApiService} from "../shared/api/api.services";
import {MatTableDataSource} from "@angular/material/table";
import {Equipment, EquipmentsModel, EquipmentTableEntry} from "./equipment.model";
import {MatSort} from "@angular/material/sort";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent implements OnInit {
  @Input() id!: number;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<EquipmentTableEntry> | undefined;
  getItemLevelColor = SharedService.getItemLevelColor;
  getClassColor = SharedService.getClassColor;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private sharedService: SharedService) {

  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   let id = +params.get('id');
    //   this.loaded = false;
    //   if (this.currentId >= 0) {
    //     this.getCurrentCharGearList();
    //   } else {
    //     this.messagingService.showMessage("Select a character in right panel");
    //   }
    // });
    console.log(this.id);
    this.apiService.getCharacterById(this.id).subscribe({
      next: (character) => {
        this.sharedService.setSelectedCharacter(character);
      }
    });
    this.apiService.getEquipmentList(this.id, true).subscribe( {
      next: (data) => {
        let equipmentTableEntries: Array<EquipmentTableEntry> = data.equipments.map(equipment => EquipmentTableEntry.build(equipment));
        this.dataSource = new MatTableDataSource(equipmentTableEntries);
        this.dataSource.sort = this.sort;
      },
      error: err => {

      }
    })
  }
}
