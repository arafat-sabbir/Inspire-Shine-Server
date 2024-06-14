import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";

const create = async (payload: TSlot) => {
    const { startTime, endTime } = payload;
    const startTimeNumber = parseInt(startTime);
    const endTimeNumber = parseInt(endTime);
    const serviceTime = (parseInt(endTime) * 60 - parseInt(startTime) * 60) / 60;
    console.log(serviceTime, startTimeNumber, endTimeNumber);
    
    const slots = []; // Array to collect all slots
  
    for (let i = startTimeNumber; i < endTimeNumber; i++) {
      payload.startTime = `${i < 10 ? "0" : ""}${i}:00`;
      payload.endTime = `${i + 1 < 10 ? "0" : ""}${i + 1}:00`;
      const newSlot = await SlotModel.create(payload);
      slots.push(newSlot); // Add the new slot to the array
    }
    
    return slots; // Return the array of slots
};

const getByQuery = async (query: any) => {
    const slots = await SlotModel.find(query);
    return slots;
  };
  

export const slotService = { create,getByQuery };
