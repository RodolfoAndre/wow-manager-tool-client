import { Component } from '@angular/core';
import {MatButton, MatFabAnchor, MatFabButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MatButton,
        MatCard,
        MatCardContent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatFabAnchor,
        MatFabButton,
        MatFormField,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatLabel,
        MatOption,
        MatProgressSpinner,
        MatRow,
        MatRowDef,
        MatSelect,
        MatSort,
        MatSortHeader,
        MatTable,
        MatToolbar
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
