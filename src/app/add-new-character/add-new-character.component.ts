import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../shared/api.service";
import {MessagingService} from "../shared/messaging.service";
import {Character} from "../shared/character/character.models";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-new-character',
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
  templateUrl: './add-new-character.component.html',
  styleUrl: './add-new-character.component.scss'
})
export class AddNewCharacterComponent {

  servers : Array<string> = [];
  filteredServers: Array<string> = [];
  character: Character = {
    name: '',
    server: ''
  };

  constructor(
    private dialogRef: MatDialogRef<AddNewCharacterComponent>,
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
    console.log(character);
    this.apiService.createChar(character).subscribe({
      next: () => {
        this.messagingService.showMessage("Saved successfully");
      },
      error: err => {
        this.messagingService.showError(err.error);
      }
    });
    this.closeDialog();
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
