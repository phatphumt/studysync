import { Schema, model, models } from "mongoose";

export default models.Quizes ||
  model(
    "Quizes",
    new Schema(
      { name: String, owner: String, quizes: [] },
      { timestamps: true }
    )
  );
