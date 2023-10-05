import mongoose from "mongoose";

export const MarkerModel = mongoose.model("markers", {
  name: String,
  position: [Number],
});
