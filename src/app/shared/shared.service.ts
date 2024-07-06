import {Injectable} from "@angular/core";
import {Character} from "./character/character.models";
import {ApiService} from "./api/api.services";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _selectedChar: Character | undefined;

  private _currentPath: string | undefined;

  private _updateCharacterCallback?: (character: Character) => void | undefined;

  constructor(private apiService: ApiService) {
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

  getCurrentCharClassColor(): string {
    let classStyleClass: string;

    switch (this._selectedChar?.id) {

      case 1:
        classStyleClass = 'warrior-background-color white-color white-text';
        break;

      case 2:
        classStyleClass = 'paladin-background-color white-color white-text';
        break;

      case 3:
        classStyleClass = 'hunter-background-color white-color white-text';
        break;

      case 4:
        classStyleClass = 'rogue-background-color black-color black-text';
        break;

      case 5:
        classStyleClass = 'priest-background-color black-color black-text';
        break;

      case 6:
        classStyleClass = 'death-knight-background-color white-color white-text'
        break;

      case 7:
        classStyleClass = 'shaman-background-color white-color white-text';
        break;

      case 8:
        classStyleClass = 'mage-background-color white-color white-text';
        break;

      case 9:
        classStyleClass = 'warlock-background-color white-color white-text';
        break;

      case 10:
        classStyleClass = 'monk-background-color black-color black-text';
        break;

      case 11:
        classStyleClass = 'druid-background-color white-color white-text';
        break;

      case 12:
        classStyleClass = 'demon-hunter-background-color white-color white-text';
        break;

      default:
        classStyleClass = '';
        break;
    }

    return classStyleClass;
  }
}
