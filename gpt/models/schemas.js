const { Schema, model } = require("mongoose");

const FlashcardSchema = model(
  "Flashcardsssss",
  new Schema({
    question: String,
    answer: String,
    owner: String,
  })
);

module.exports = { FlashcardSchema };
