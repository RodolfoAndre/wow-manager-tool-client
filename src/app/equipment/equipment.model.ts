import {EquipmentResponse} from "../shared/api.models";

export class EquipmentTableEntry {
  name?: string;
  itemLevel?: number;
  slotName?: string;
  isBestInSlot?: boolean;
  bestInSlotName?: string;
  bestInSlotInstance?: string;
  bestInSlotBossName?: string;
  blizzardId?: number;

  static build(equipment: EquipmentResponse): EquipmentTableEntry {
    let bestInSlot: EquipmentResponse | undefined = undefined;
    if (equipment.bisEquipments.length > 0) {
      let foundBisEquipment = equipment.bisEquipments.find(bisEquipment => bisEquipment.blizzardId === equipment.blizzardId);
      bestInSlot = foundBisEquipment != undefined ? foundBisEquipment : equipment.bisEquipments[0];
    }
    return this.convertToTableEntry(equipment, bestInSlot);
  }

  private static convertToTableEntry(equipment: EquipmentResponse, bestInSlot: EquipmentResponse| undefined): EquipmentTableEntry {
    return {
      name: equipment.name,
      blizzardId: bestInSlot ? bestInSlot.blizzardId : undefined,
      itemLevel: equipment.itemLevel,
      slotName: equipment.slotName,
      isBestInSlot: bestInSlot ? (equipment.blizzardId === bestInSlot.blizzardId || equipment.name === bestInSlot.name) : undefined,
      bestInSlotName: bestInSlot ? bestInSlot.name : "Not Provided",
      bestInSlotInstance: bestInSlot ? (bestInSlot.instanceName ? bestInSlot.instanceName : "Crafted") : "Not Provided",
      bestInSlotBossName: bestInSlot ? (bestInSlot.bossName ? bestInSlot.bossName : "Crafted") : "Not Provided",
    };
  }

  public static buildForSameSlotType(equipments: EquipmentResponse[]) {
    let response: EquipmentTableEntry[] = [];

    let firstSlot = equipments[0];
    let secondSlot = equipments[1];

    let foundBisForFirst = firstSlot.bisEquipments.find(bisEquipment => bisEquipment.blizzardId === firstSlot.blizzardId);
    if (!foundBisForFirst) {
      foundBisForFirst = firstSlot.bisEquipments.find(bisEquipment => bisEquipment.blizzardId !== secondSlot.blizzardId);
    }

    let foundBisForSecond = secondSlot.bisEquipments.find(bisEquipment => bisEquipment.blizzardId === secondSlot.blizzardId);
    if (!foundBisForSecond) {
      foundBisForSecond = secondSlot.bisEquipments.find(bisEquipment => bisEquipment.blizzardId !== foundBisForFirst?.blizzardId)
    }

    response.push(EquipmentTableEntry.convertToTableEntry(firstSlot, foundBisForFirst));
    response.push(EquipmentTableEntry.convertToTableEntry(secondSlot, foundBisForSecond));

    return response;
  }
}
