import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import SlotModel from "./slot.model";

const create = async (payload: TSlot) => {
  const { startTime, endTime } = payload;
  const startTimeNumber = parseInt(startTime);
  const endTimeNumber = parseInt(endTime);
  const serviceTime = (parseInt(endTime) * 60 - parseInt(startTime) * 60) / 60;
  console.log(serviceTime, startTimeNumber, endTimeNumber);

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
  if (!slots || !slots.length) throw new AppError(404, "No Data Found", []);
  return slots;
};

export const slotService = { create, getAvailableByQuery };
