import { FilterQuery, Query, Aggregate } from 'mongoose';

// Generic QueryBuilder class to build Mongoose queries or aggregation pipelines
class QueryBuilder<T> {
  private isAggregate: boolean;
  public modelQuery: Query<T[], T> | Aggregate<T[]>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T> | Aggregate<T[]>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.isAggregate = this.checkIfAggregate(modelQuery);
  }

  private checkIfAggregate(modelQuery: Query<T[], T> | Aggregate<T[]>): boolean {
    return (modelQuery as any).aggregate !== undefined; // Check if it's an Aggregate
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm;
  
    // Ensure that searchTerm is a string and not empty
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      // Create conditions for searchable fields
      const searchConditions = searchableFields.map((field) => {
        return {
          [field]: { $regex: new RegExp(searchTerm, 'i') }, // Construct RegExp only if searchTerm is valid
        };
      });
  
      if (this.isAggregate) {
        // For aggregation, add a $match stage
        this.modelQuery = (this.modelQuery as Aggregate<T[]>).match({ $or: searchConditions as FilterQuery<T>[] });
      } else {
        // For regular queries, use find with the correct structure
        this.modelQuery = (this.modelQuery as Query<T[], T>).find({ $or: searchConditions as FilterQuery<T>[] });
      }
    }
  
    return this;
  }
  
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    if (this.isAggregate) {
      // For aggregation, add a $match stage
      this.modelQuery = (this.modelQuery as Aggregate<T[]>).match(queryObj);
    } else {
      // For regular queries, use find
      this.modelQuery = (this.modelQuery as Query<T[], T>).find(queryObj as FilterQuery<T>);
    }
    return this;
  }

  sort() {
    const sort = (this.query.sort as string)?.split(',')?.join(' ') || 'createdAt';
    if (this.query.sort) {
      if (this.isAggregate) {
        // For aggregation, add a $sort stage
        this.modelQuery = (this.modelQuery as Aggregate<T[]>).sort(sort as any);
      } else {
        // For regular queries, use sort
        this.modelQuery = (this.modelQuery as Query<T[], T>).sort(sort as string);
      }
    }
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (this.isAggregate) {
      // For aggregation, add a $skip and $limit stage
      this.modelQuery = (this.modelQuery as Aggregate<T[]>).skip(skip).limit(limit);
    } else {
      // For regular queries, use skip and limit
      this.modelQuery = (this.modelQuery as Query<T[], T>).skip(skip).limit(limit);
    }
    return this;
  }

  // Uncomment and modify the fields() method if needed
  // fields() {
  //   let fields = (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
  //   if (this.isAggregate) {
  //     // For aggregation, this will need to be adjusted
  //   } else {
  //     this.modelQuery = this.modelQuery.select(fields);
  //   }
  //   return this;
  // }
}

export default QueryBuilder;
