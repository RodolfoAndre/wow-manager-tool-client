import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "../character/character.models";
import {EquipmentsModel} from "../../equipment/equipment.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL : string = "http://localhost:8080";

  private RENDER_URL : string = 'https://render-us.worldofwarcraft.com/icons';

  constructor(private httpClient: HttpClient) {
  }

  getCharacters() {
    return this.httpClient.get<Array<Character>>(`${this.API_URL}/char`);
  }

  getCharacterById(id : number) {
    return this.httpClient.get<Character>(`${this.API_URL}/char/${id}`);
  }

  createChar(char: Character) {
    return this.httpClient.post(`${this.API_URL}/char`, char);
  }

  deleteCharacter(id: number) {
    return this.httpClient.delete(`${this.API_URL}/char/${id}`);
  }

  getMountsDrop(id: number) {
    return this.httpClient.get(`${this.API_URL}/mount/drop/${id}`);
  }

  getMountList(id: number) {
    return this.httpClient.get(`${this.API_URL}/mount/list/${id}`);
  }

  getReputationList(id: number) {
    return this.httpClient.get(`${this.API_URL}/reputation/list/${id}`);
  }

  getEquipmentList(id: number, retrieveBis: boolean) {
    return this.httpClient.get<EquipmentsModel>(`${this.API_URL}/gear/${id}?retrieveBis=${retrieveBis}`);
  }

  getServers() {
    return this.httpClient.get<Array<String>>(`${this.API_URL}/data/server`);
  }

  getIconUrl(iconPath : string, size : number) {
    return `${this.RENDER_URL}/${size}/${iconPath}.jpg`
  }
}
