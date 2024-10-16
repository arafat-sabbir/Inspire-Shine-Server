import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import ServiceModel from "./service.model";
import { SortOrder } from "mongoose";

const create = async (payload: TService) => {
  const service = await ServiceModel.create(payload);
  return service;
};


const getAll = async (query: Record<string, unknown>) => {

  // Handle categories filter
  const categories = (query.categories as string)?.split(',');
  let filterQuery: any = { isDeleted: false }; // Default filter to exclude deleted services

  // Categories filter
  if (categories?.length > 0 && !categories.includes('all')) {
    filterQuery.category = { $in: categories };
  }

  // Search filter
  if (query.searchTerm) {
    const searchTerm = query.searchTerm as string;
    filterQuery.name = { $regex: new RegExp(searchTerm, 'i') }; // Case-insensitive search
  }

  // Construct sort query
  const sortQuery: { [key: string]: 1 | -1 } = {}; // Corrected to strictly use 1 or -1
  const sortField = 'price';
  const sortOrder = query.sort as 'asc' | 'desc';

  if (query?.sort) {
    sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1; // Using strictly 1 or -1
  }

  // Create aggregation pipeline
  const pipeline = [
    {
      $match: filterQuery // Match services based on the filterQuery
    },
    {
      $lookup: {
        from: "slots", // The name of your slots collection
        localField: "_id", // The local field from the Service collection
        foreignField: "service", // The foreign field from the Slot collection
        as: "slots" // The new field that will hold the array of slots
      }
    },
    {
      $sort: sortQuery // Apply sorting based on price
    }
  ];

  // Perform the aggregation
  const data: any = new QueryBuilder(
    ServiceModel.aggregate(pipeline), // Use aggregate instead of find
    query
  ).paginate(); // Pagination

  const services = await data.modelQuery;
  const totalServices = await ServiceModel.countDocuments(filterQuery); // Count the total services based on filterQuery
  return { services, totalServices };
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
