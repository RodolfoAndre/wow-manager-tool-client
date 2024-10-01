import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "./character/character.models";
import {ReputationListResponse} from "../reputation/reputation.models";
import {MountListResponse} from "../mount/mount.model";
import {
  BestInSlotResponse,
  BestInSlotsResponse, BestsInSlotsRequest,
  EquipmentListResponse,
  MountsDropResponse, PlayableClassesResponse, PlayableClassResponse, SearchRequest,
  SpecializationsResponse
} from "./api.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = "http://localhost:8080";

  private RENDER_URL: string = 'https://render-us.worldofwarcraft.com/icons';

  constructor(private httpClient: HttpClient) {
  }

  getCharacters() {
    return this.httpClient.get<Array<Character>>(`${this.API_URL}/char`);
  }

  getCharacterById(id: number) {
    return this.httpClient.get<Character>(`${this.API_URL}/char/${id}`);
  }

  createChar(char: Character) {
    return this.httpClient.post<void>(`${this.API_URL}/char`, char);
  }

  deleteCharacter(id: number) {
    return this.httpClient.delete<void>(`${this.API_URL}/char/${id}`);
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

  getEquipmentList(id: number, retrieveBis: boolean) {
    return this.httpClient.get<EquipmentListResponse>(`${this.API_URL}/gear/${id}?retrieveBis=${retrieveBis}`);
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
    return this.httpClient.post<EquipmentListResponse>(`${this.API_URL}/gear/search`, search);
  }
}
