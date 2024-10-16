import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";

const create = async (payload: TSlot) => {
  const { startTime, endTime, date } = payload;
  const isSlotExist = await SlotModel.findOne({ date, startTime });
  if (isSlotExist) {
    throw new AppError(
      400,
      `Slot For Date ${date} And This Time Already Exist`
    );
  }
  const startTimeNumber = parseInt(startTime);
  const endTimeNumber = parseInt(endTime);
  const serviceTime = (parseInt(endTime) * 60 - parseInt(startTime) * 60) / 60;

  const slots = [];

  for (let i = startTimeNumber; i < endTimeNumber; i++) {
    payload.startTime = `${i < 10 ? "0" : ""}${i}:00`;
    payload.endTime = `${i + 1 < 10 ? "0" : ""}${i + 1}:00`;
    const newSlot = await SlotModel.create(payload);
    slots.push(newSlot);
  }

  return slots;
};

const getAvailableByQuery = async (query: any) => {
  type newQuery = {
    service?: string;
    date?: string;
  };
  const newQuery: newQuery = {};
  if (query.serviceId) {
    newQuery.service = query.serviceId;
  }
  if (query.date) {
    newQuery.date = query.date;
  }
  const slots = await SlotModel.find({
    ...newQuery,
    isBooked: "available",
  }).populate("service");
  // if (!slots || !slots.length) throw new AppError(404, "No Data Found", []);
  return slots || [];
};

const updateSlotStatus = async (id: string, status: string) => {
  const slot = await SlotModel.findById(id);
  if(slot?.isBooked==="booked"){
    throw new AppError(400, "Slot Already Booked");
  }else{
    const updatedSlot = await SlotModel.findByIdAndUpdate(id, { isBooked: status }, { new: true });
    if (!updatedSlot) throw new AppError(404, "No Data Found", []);
    return updatedSlot;
  }
};


const getAllSlots = async () => {
  const slots = await SlotModel.find().populate("service");
  return slots||[];
};

export const slotService = { create, getAvailableByQuery,updateSlotStatus,getAllSlots };
