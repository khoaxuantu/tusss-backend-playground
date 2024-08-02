import { HydratedDocument, Model } from "mongoose";

export abstract class AbstractModelFactory<T>  {
  constructor(protected model: Model<any>) {}

  create(payload: Partial<T>): Promise<HydratedDocument<T>> {
    return new this.model(payload).save();
  }
}
