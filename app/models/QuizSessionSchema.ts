import { Schema, model, models } from "mongoose";

export default models.QuizSession ||
  model(
    "QuizSession",
    new Schema(
      {
        sessionID: String,
        correct: [],
        wrong: [],
        quizes: [],
        id: String,
      },
      { timestamps: true }
    )
  );
