import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", (req, res) => {
  res.json("Helloooooooooooo");
});

app.listen(4999, () => {
  console.log(`Port in running on 4999`);
});
