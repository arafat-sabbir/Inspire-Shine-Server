import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";

const create = async (payload: TSlot) => {
  const slot = await SlotModel.create(payload);
  return slot;
};

const slotService = { create };
