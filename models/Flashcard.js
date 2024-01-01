const { Schema, model } = require("mongoose");

const FlashcardSchema = new Schema({
  flashcards: [],
  owner: String,
  name: String,
});

module.exports = model("Flashcard", FlashcardSchema);
