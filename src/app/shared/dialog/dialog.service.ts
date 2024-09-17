import {Injectable} from "@angular/core";
import {ConfirmAddNewCharacterEvents, ConfirmDialogEvents} from "./confirm-dialog/confirm-dialog.models";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddNewCharacterDialogComponent} from "./add-new-character-dialog/add-new-character-dialog.component";
import {AddNewCharacterModel} from "./add-new-character-dialog/add-new-character-dialog.models";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(events: ConfirmDialogEvents) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        events.confirm?.();
      } else {
        events.cancel?.();
      }
    });
  }

  openAddNewCharacterDialog(events: ConfirmAddNewCharacterEvents) {
    const dialogRef = this.dialog.open(AddNewCharacterDialogComponent);

    dialogRef.afterClosed().subscribe((character: AddNewCharacterModel) => {
      if (character) {
        events.confirm?.(character);
      } else {
        events.cancel?.();
      }
    });
  }
}
