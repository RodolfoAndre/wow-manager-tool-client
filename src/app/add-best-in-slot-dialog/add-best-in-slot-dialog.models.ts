import {EquipmentResponse} from "../shared/api.models";

export class EquipmentSearchTableEntry {
  id?: number;
  slotName?: string;
  slotType?: string;
  name?: string;
  isSelected: boolean = false;

  static from(equipment: EquipmentResponse): EquipmentSearchTableEntry {
    return {
      id: equipment.blizzardId,
      name: equipment.name,
      slotName: equipment.slotName,
      slotType: equipment.slotType,
      isSelected: false,
    }
  }
}
