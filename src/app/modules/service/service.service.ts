import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const create = async (payload: TService) => {
  const service = await ServiceModel.create(payload);
  return service;
};
const getAll = async () => {
  const services = await ServiceModel.find({ isDeleted: false });
  if(!services || !services.length) throw new AppError(404, "No Data Found", []);
  return services;
};
const getSingle = async (id: string) => {
  const service = await ServiceModel.findById({ _id: id });
  if(!service) throw new AppError(404, "No Data Found", []);
  if (service.isDeleted) throw new AppError(404, "Service Has Been Deleted");
  return service;
};

const updateSingle = async (id: string, payload: Partial<TService>) => {
  const service = await ServiceModel.findById({ _id: id });
  if (service && service.isDeleted)
    throw new AppError(404, "Service Has Been Deleted");
  if (!service) throw new AppError(404, "No Data Found",[]);
  const updatedService = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!updatedService) throw new AppError(404, "No Data Found",[]);
  return updatedService;
};
const deleteSingle = async (id: string) => {
  const deletedService = await ServiceModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  if (!deletedService) {
    throw new AppError(404, "No Data Found",[]);
  }
  return deletedService;
};
export const serviceService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
