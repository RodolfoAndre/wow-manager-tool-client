import {Injectable} from "@angular/core";
import {Character} from "./character/character.models";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _selectedChar: Character | undefined;

  private _currentPath: string | undefined;

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
    console.log(character);
  }

  static getItemLevelColor(itemLevel: number) {
    let classStyle = "";

    if (itemLevel < 480) {
      classStyle = "uncommon-background black-color black-text";
    } else if (itemLevel >= 480 && itemLevel <= 502) {
      classStyle = "rare-background white-color white-text";
    } else if (itemLevel > 502 && itemLevel <= 515) {
      classStyle = "epic-background white-color white-text";
    } else if (itemLevel > 515 && itemLevel <= 528) {
      classStyle = "legendary-background white-color white-text";
    }

    return classStyle;
  }

  static getClassColor(id: number) {
    let classStyleClass: string = '';

    switch (id) {

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
    }
    return classStyleClass;
  }
}
