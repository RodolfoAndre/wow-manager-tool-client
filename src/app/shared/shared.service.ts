import {Injectable} from "@angular/core";
import {Character} from "./character/character.models";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedChar: Character | undefined;

  private currentPath: string | undefined;

  public setNavigationPath(path: string): void {
    this.currentPath = path;
    if (this.selectedChar) {
      // router.navigate([path, this.selectedChar.id])
    }
  }

  public getNavigationPath()  {
    return this.currentPath;
  }

  public setSelectedCharacter(character: Character) {
    console.log(character);
  }
}
