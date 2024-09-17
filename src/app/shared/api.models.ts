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
