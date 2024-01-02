import { Schema, model, models } from "mongoose";

export default models.GoodFlashcard ||
  model(
    "GoodFlashcard",
    new Schema(
      { name: String, owner: String, flashcards: [] },
      { timestamps: true }
    )
  );
