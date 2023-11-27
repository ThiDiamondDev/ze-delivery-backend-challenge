import mongoose, { PipelineStage } from "mongoose";

export const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const coverageAreaSchema = new mongoose.Schema({
  type: { type: String, enum: ["MultiPolygon"], required: true },
  coordinates: { type: [[[[Number]]]], required: true },
});

export const nearestPartnerQuery = (
  coordinates: [number, number]
): PipelineStage => ({
  $geoNear: {
    near: {
      type: "Point",
      coordinates,
    },
    spherical: true,
    distanceField: "distanceInMeters",
    query: {
      coverageArea: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates,
          },
        },
      },
    },
  },
});
