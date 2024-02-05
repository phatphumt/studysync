import { Schema, model, models } from "mongoose";

const theModel =
  models.GoodFlashcard ||
  model(
    "GoodFlashcard",
    new Schema(
      { name: String, owner: String, flashcards: [] },
      { timestamps: true }
    )
  );

export default theModel;
