import { Schema, Model, model } from "mongoose";
import { Point, MultiPolygon } from "geojson";
import { addressSchema, coverageAreaSchema } from "./geoJson";

export interface IPartner {
  id: number;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: { type: "MultiPolygon"; coordinates: MultiPolygon };
  address: [type: "Point", coordinates: Point];
}

const PartnerSchema: Schema = new Schema({
  id: { type: Number, required: true },
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true },
  coverageArea: {
    type: coverageAreaSchema,
    required: true,
    index: "2dsphere",
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

const PartnerModel: Model<IPartner> = model<IPartner>("Partner", PartnerSchema);

export { PartnerModel };
