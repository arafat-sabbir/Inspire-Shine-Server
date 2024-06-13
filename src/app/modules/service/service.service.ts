import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const create = async (payload: TService) => {
  const service = await ServiceModel.create(payload);
  return service;
};
const getAll = async () => {
  const services = await ServiceModel.find();
  if (!services) {
    throw new AppError(404, "Services not found");
  }
  return services;
};
const getSingle = async (id: string) => {
  const service = await ServiceModel.findById({ _id: id });
  if (!service) {
    throw new AppError(404, "Service not found");
  }
  return service;
};

const updateSingle = async (id: string, payload: Partial<TService>) => {
  const updatedService = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedService;
};

export const serviceService = { create, getAll, getSingle, updateSingle };
