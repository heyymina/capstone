import express from "express";
import teasRouter from "./routes/teas.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/teas", teasRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
