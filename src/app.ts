import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello assingment 3!");
});

export default app;
