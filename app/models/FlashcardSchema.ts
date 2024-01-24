import { Schema, model, models } from "mongoose";

const theModel = model(
  "GoodFlashcard",
  new Schema(
    { name: String, owner: String, flashcards: [] },
    { timestamps: true }
  )
);

export default models.GoodFlashcard || theModel;
