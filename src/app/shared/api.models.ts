export interface EquipmentListResponse {
  equipments: Array<EquipmentResponse>;
}

export interface EquipmentResponse {
  blizzardId: number;
  name: string;
  quality: string;
  itemLevel: number;
  instanceName: string;
  bossName: string;
  slotType: string;
  slotName: string;
  bisEquipments: Array<EquipmentResponse>
}

export interface MountDropResponse {
  name: string,
  bossName: string,
  dropRate: number,
  tries: number,
  timestamp: number,
  collected: boolean,
  nextDropRate: number,
  madeThisWeek: boolean,
  maxAttempts: number,
  lastDropRate: number
}

export interface MountsDropResponse {
  mounts: Array<MountDropResponse>;
}

export interface SpecializationsResponse {
  specializations: Array<SpecializationResponse>;
}

export interface SpecializationResponse {
  id: number;
  name: string;
}

export interface BestInSlotResponse {
  blizzardId: number;
  slotType: string;
  name: string;
  bisPreferred: boolean;
  instanceId: number;
}

export interface BestInSlotsResponse {
  id: string;
  specId: number;
  bestInSlots: Array<BestInSlotResponse>;
}

export interface BestsInSlotsRequest {
  id: string | undefined;
  specId: number;
  bestInSlotsIds: Array<number>;
}

export interface PlayableClassesResponse {
  classes: PlayableClassResponse[];
}

export interface PlayableClassResponse {
  id: number;
  name: string;
  specializations: Array<SpecResponse>;
}

export interface SpecResponse {
  id: number;
  name: string;
}

export interface SearchRequest {
  searchOption: string | undefined;
  value: string | undefined;
}
