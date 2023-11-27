import mongoose from "mongoose";

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
