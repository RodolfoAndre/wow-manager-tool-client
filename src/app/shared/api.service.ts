import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "./character/character.models";
import {ReputationListResponse} from "../reputation/reputation.models";
import {MountListResponse} from "../mount/mount.model";
import {
  BestInSlotsResponse,
  BestsInSlotsRequest,
  EquipmentListResponse,
  MountsDropResponse,
  PlayableClassesResponse,
  PlayableClassResponse,
  SearchRequest,
  SpecializationsResponse
} from "./api.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = "https://api.wow-manager-tool.com";

  private RENDER_URL: string = 'https://render-us.worldofwarcraft.com/icons';

  constructor(private httpClient: HttpClient) {
  }

  getCharacters() {
    return this.httpClient.get<Array<Character>>(`${this.API_URL}/character`);
  }

  getCharacterById(id: number) {
    return this.httpClient.get<Character>(`${this.API_URL}/character/${id}`);
  }

  createChar(char: Character) {
    return this.httpClient.post<void>(`${this.API_URL}/character`, char);
  }

  deleteCharacter(id: number) {
    return this.httpClient.delete<void>(`${this.API_URL}/character/${id}`);
  }

  getMountsDrop(id: number) {
    return this.httpClient.get<MountsDropResponse>(`${this.API_URL}/mount/drop/${id}`);
  }

  getMountList(id: number) {
    return this.httpClient.get<MountListResponse>(`${this.API_URL}/mount/list/${id}`);
  }

  getReputationList(id: number) {
    return this.httpClient.get<ReputationListResponse>(`${this.API_URL}/reputation/list/${id}`);
  }

  getEquipmentListWithBis(id: number, specId: number) {
    return this.httpClient.get<EquipmentListResponse>(`${this.API_URL}/equipment/${id}/${specId}`);
  }

  getEquipmentList(id: number) {
    return this.httpClient.get<EquipmentListResponse>(`${this.API_URL}/equipment/${id}`);
  }

  getServers() {
    return this.httpClient.get<Array<string>>(`${this.API_URL}/data/server`);
  }

  getSpecializations() {
    return this.httpClient.get<SpecializationsResponse>(`${this.API_URL}/data/specialization`);
  }

  getIconUrl(iconPath: string, size: number) {
    return `${this.RENDER_URL}/${size}/${iconPath}.jpg`
  }

  getBestInSlots(id: number) {
    return this.httpClient.get<BestInSlotsResponse>(`${this.API_URL}/best-in-slot/${id}`);
  }

  saveSpecializationBis(request: BestsInSlotsRequest) {
    return this.httpClient.post(`${this.API_URL}/best-in-slot`, request);
  }

  getPlayableClasses() {
    return this.httpClient.get<PlayableClassesResponse>(`${this.API_URL}/data/classes`);
  }

  getPlayableClassesById(id: number) {
    return this.httpClient.get<PlayableClassResponse>(`${this.API_URL}/data/classes/${id}`);
  }

  searchItem(search: SearchRequest) {
    return this.httpClient.post<EquipmentListResponse>(`${this.API_URL}/equipment/search`, search);
  }
}
