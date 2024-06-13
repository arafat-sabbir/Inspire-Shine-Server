import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const create = async (payload: TService) => {
  const service = await ServiceModel.create(payload);
  return service;
};

const getAll = async () => {
  const services = await ServiceModel.find();
};
const getSingle = async (id: string) => {
  const service = await ServiceModel.findById(id);
  return service;
};

export const serviceService = { create, getAll, getSingle };
