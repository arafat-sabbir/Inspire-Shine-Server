import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const create = async (payload: TService) => {
  const service = await ServiceModel.create(payload);
  return service;
};

export const serviceService = { create };
