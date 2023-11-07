const express = require("express");
const { config } = require("dotenv");
const { flashcardPrompt, aiPrompt } = require("./prompts");

config();
const aiFlashcardRouter = express.Router();
const sendError = (res, e) => res.status(500).send({ error: `${e}` });

aiFlashcardRouter.get("/test", async (_, res) => {
  console.log("getting");
  const a = await aiPrompt(flashcardPrompt("10", "movement and force"));
  res.send(a);
});

aiFlashcardRouter.post("/", async (req, res) => {
  const { choices, topic } = req.body;

  if (!choices) {
    sendError(res, "choices or topic must not be empty");
    return;
  }
  if (!topic) {
    sendError(res, "choices or topic must not be empty");
    return;
  }

  const a = await aiPrompt(flashcardPrompt(choices, topic));
  res.send(a);
});
module.exports = aiFlashcardRouter;
