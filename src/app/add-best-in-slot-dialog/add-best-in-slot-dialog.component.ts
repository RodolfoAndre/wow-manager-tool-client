import {Component, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {TitleCasePipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {EquipmentListResponse, SearchRequest} from "../shared/api.models";
import {MatOption} from "@angular/material/autocomplete";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {EquipmentSearchTableEntry} from "./add-best-in-slot-dialog.models";

@Component({
  selector: 'app-add-best-in-slot-dialog',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormField, FormsModule, MatInput, MatLabel, MatIcon, MatCard, MatCardContent, MatToolbar, MatFabButton, MatRadioGroup, MatRadioButton, TitleCasePipe, MatSelect, MatOption, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatSort, MatSortHeader, MatTable, MatHeaderCellDef, MatRowDef, MatRow, MatCheckbox, MatProgressSpinner],
  templateUrl: './add-best-in-slot-dialog.component.html',
  styleUrl: './add-best-in-slot-dialog.component.scss'
})
export class AddBestInSlotDialogComponent {


  @ViewChild(MatSort) sort: MatSort | null = null;
  id: number | undefined = undefined;
  name: string | undefined = undefined;
  selectedOption: string | undefined;
  inputValue: string | undefined;
  includedItems: EquipmentSearchTableEntry[] | undefined;
  searchResult: EquipmentSearchTableEntry[] = [];
  loadingResults: boolean = false;
  displayedColumns: string[] = ['isSelected', 'blizzardId', 'slotName', 'name'];
  dataSource: MatTableDataSource<EquipmentSearchTableEntry> = new MatTableDataSource(this.searchResult);

  constructor(private dialogRef: MatDialogRef<AddBestInSlotDialogComponent>, private apiService: ApiService, private messagingService: MessagingService) {
  }

  onAdd() {
    this.dialogRef.close(this.searchResult
      .filter(equipment => equipment.isSelected));
  }

  onSearch() {

    if (this.selectedOption && this.selectedOption == "html") {
      this.selectedOption = "ID";
      this.inputValue = this.getIdsFromHtmlTable(this.inputValue);
    }
    let searchRequest: SearchRequest = {
      searchOption: this.selectedOption?.toUpperCase(), value: this.inputValue
    }
    this.loadingResults = true;

    this.apiService.searchItem(searchRequest).subscribe({
      next: (response: EquipmentListResponse) => {

        this.includedItems = this.searchResult
          .filter(equipment => equipment.isSelected);

        let searchEntries = response.equipments
          .map(response => EquipmentSearchTableEntry.from(response));

        this.searchResult.splice(0, this.searchResult.length);
        this.searchResult.push(...this.includedItems);
        this.searchResult.push(...searchEntries
            .filter(equipment =>
              !this.includedItems?.find(item => item.id == equipment.id))
            .sort((a, b) => {
              const value = searchRequest.value?.toLowerCase() || '';
              const aName = a.name?.toLowerCase() || '';
              const bName = b.name?.toLowerCase() || '';
              const aMatch = aName.includes(value) ? 1 : 0;
              const bMatch = bName.includes(value) ? 1 : 0;
              return bMatch - aMatch || aName.localeCompare(bName);
            })
          );

        this.dataSource.sort = this.sort;

        this.loadingResults = false;
      }, error: (error) => {
        this.messagingService.showError(error);
        this.loadingResults = false;
      }
    });
  }

  getIdsFromHtmlTable(tableHtml: string | undefined) {
    if (tableHtml == undefined) {
      return "";
    }

    let ids: string[] = [];

    const pattern = /item=(\d+)/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(tableHtml)) !== null) {
      ids.push(match[1]);
    }

    return ids.join(",");
  }

  onCancel() {
    this.dialogRef.close();
  }
}
