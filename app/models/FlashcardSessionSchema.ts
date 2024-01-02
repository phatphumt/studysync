import { Schema, model, models } from "mongoose";

export default models.FlashcardSessionSchema ||
  model(
    "FlashcardSessionSchema",
    new Schema(
      {
        sessionID: String,
        correct: Number,
        wrong: Number,
        flashcards: [],
        id: String,
      },
      { timestamps: true }
    )
  );
