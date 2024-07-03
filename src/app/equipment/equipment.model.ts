export interface Equipment {
  blizzardId: number;
  name: string;
  quality: string;
  itemLevel: number;
  instanceName: string;
  bossName: string;
  slotType: string;
  slotName: string;
  bisEquipments: Array<Equipment>
}

export interface EquipmentsModel {
  equipments: Array<Equipment>;
}

export class EquipmentTableEntry {
  name?: string;
  itemLevel?: number;
  slotName?: string;
  isBestInSlot?: boolean;
  bestInSlotName?: string;
  bestInSlotInstance?: string;
  bestInSlotBossName?: string;

  static build(equipment: Equipment): EquipmentTableEntry {
    let bestInSlot = undefined;
    if (equipment.bisEquipments.length > 0) {
      let foundBisEquipment = equipment.bisEquipments.find(bisEquipment => bisEquipment.blizzardId === equipment.blizzardId);
      bestInSlot = foundBisEquipment != undefined ? foundBisEquipment : equipment.bisEquipments[0];
    }

    return {
      name: equipment.name,
      itemLevel: equipment.itemLevel,
      slotName: equipment.slotName,
      isBestInSlot: bestInSlot ? (equipment.blizzardId === bestInSlot.blizzardId || equipment.name === bestInSlot.name) : undefined,
      bestInSlotName: bestInSlot ? bestInSlot.name : "Not Provided",
      bestInSlotInstance: bestInSlot ? (bestInSlot.instanceName ? bestInSlot.instanceName : "Crafted") : "Not Provided",
      bestInSlotBossName: bestInSlot ? (bestInSlot.bossName ? bestInSlot.bossName : "Crafted") : "Not Provided",
    };
  }
}
