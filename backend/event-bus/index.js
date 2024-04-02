import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Event bus is Live");
});

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log(event);

  await axios.post("http://localhost:3001/api/v1/events", event);
  await axios.post("http://localhost:3002/api/v1/events", event);
//   await axios.post("http://localhost:3003/events", event);

  res.status(200).json({
    success: true,
    message: "OK",
  });

  console.log("done")

});

// app.post("/events", async (req, res) => {
//   const event = req.body;

//   console.log("Hello");
//   console.log(event);

//   res.status(200).json({
//     success: true,
//     message: "OK",
//     event,
//   });

// });

app.listen(PORT, () => {
  console.log(`Event bus is running on PORT ${PORT}`.yellow.bold);
});
