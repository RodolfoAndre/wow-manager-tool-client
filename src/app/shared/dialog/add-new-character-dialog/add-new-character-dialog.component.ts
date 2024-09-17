import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../api.service";
import {MessagingService} from "../../messaging.service";
import {Character} from "../../character/character.models";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-new-character-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatDialogActions,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './add-new-character-dialog.component.html',
  styleUrl: './add-new-character-dialog.component.scss'
})
export class AddNewCharacterDialogComponent {

  servers : Array<string> = [];
  filteredServers: Array<string> = [];
  character: Character = {
    name: '',
    server: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddNewCharacterDialogComponent>,
    private apiService: ApiService,
    private messagingService: MessagingService) {
    this.getServers();
  }

  getServers() {
    this.apiService.getServers().subscribe( {
      next: (servers) => {
        this.servers = servers;
        this.filteredServers = this.servers;
      },
      error: err => {
        this.messagingService.showError(err.error);
      }
    });
  }

  protected save(character : Character) {
    this.dialogRef.close(character);
  }

  protected closeDialog() {
    this.dialogRef.close();
  }

  onServerInputChange() {
    const filterValue = this.character.server.toLowerCase();
    this.filteredServers = this.servers.filter(server =>
      server.toLowerCase().includes(filterValue)
    );
  }
}
