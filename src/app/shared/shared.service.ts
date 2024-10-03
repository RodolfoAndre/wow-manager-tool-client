import {Injectable} from "@angular/core";
import {Character} from "./character/character.models";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _selectedChar: Character | undefined;

  private _currentPath: string | undefined;

  private _updateCharacterCallback?: (character: Character) => void | undefined;

  constructor() {
  }

  public setNavigationPath(path: (string | undefined)[]): void {
    this._currentPath = path.join("/");
    if (this._selectedChar) {
      // router.navigate([path, this._selectedChar.id])
    }
  }

  public getNavigationPath()  {
    return this._currentPath;
  }

  public setSelectedCharacter(character: Character) {
    this._selectedChar = character;
  }

  public setUpdateCharacterCallback(updateCharacterCallback: (character: Character) => void | undefined) {
    this._updateCharacterCallback = updateCharacterCallback;
  }

  public getSelectedCharacter(): Character | undefined {
    return this._selectedChar;
  }

  static getItemLevelColor(itemLevel: number) {
    let classStyle = "";

    if (itemLevel < 480) {
      classStyle = "uncommon-background black-color black-text";
    } else if (itemLevel >= 480 && itemLevel <= 502) {
      classStyle = "rare-background white-color white-text";
    } else if (itemLevel > 502 && itemLevel <= 515) {
      classStyle = "epic-background white-color white-text";
    } else if (itemLevel > 515 && itemLevel <= 524) {
      classStyle = "legendary-background white-color white-text";
    } else if (itemLevel > 524 && itemLevel <= 535) {
      classStyle = "artifact-background black-color black-text";
    }

    return classStyle;
  }

  static getClassColor(id?: number): string {
    let classStyleClass: string;

    switch (id) {

      case 1:
        classStyleClass = 'warrior-background-color ct-white-color';
        break;

      case 2:
        classStyleClass = 'paladin-background-color ct-white-color';
        break;

      case 3:
        classStyleClass = 'hunter-background-color ct-white-color';
        break;

      case 4:
        classStyleClass = 'rogue-background-color ct-black-color';
        break;

      case 5:
        classStyleClass = 'priest-background-color ct-black-color';
        break;

      case 6:
        classStyleClass = 'death-knight-background-color ct-white-color'
        break;

      case 7:
        classStyleClass = 'shaman-background-color ct-white-color';
        break;

      case 8:
        classStyleClass = 'mage-background-color ct-white-color';
        break;

      case 9:
        classStyleClass = 'warlock-background-color ct-white-color';
        break;

      case 10:
        classStyleClass = 'monk-background-color ct-black-color';
        break;

      case 11:
        classStyleClass = 'druid-background-color ct-white-color';
        break;

      case 12:
        classStyleClass = 'demon-hunter-background-color ct-white-color';
        break;

      default:
        classStyleClass = '';
        break;
    }

    return classStyleClass;
  }

  sortByName(array: Array<any>) {
    array?.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      } else {
        return -1;
      }
    });
  }
}
