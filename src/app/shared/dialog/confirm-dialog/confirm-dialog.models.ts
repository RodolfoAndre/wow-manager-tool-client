import {AddNewCharacterModel} from "../add-new-character-dialog/add-new-character-dialog.models";

export interface ConfirmDialogEvents {
  confirm?: () => void,
  cancel?: () => void
}

export interface ConfirmAddNewCharacterEvents {
  confirm?: (character: AddNewCharacterModel) => void,
  cancel?: () => void
}
