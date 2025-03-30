import express from "express";
import { teas } from "../data/teas.js";  

const router = express.Router();


router.get("/", (req, res) => {
  res.json(teas);
});


router.get("/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = teas.find(t => t.id === teaId);

  if (tea) {
    res.json(tea);
  } else {
    res.status(404).json({ error: "Tea not found" });
  }
});

export default router;
