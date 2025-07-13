import express from "express";
import userRouter from "./routes/user.routes.js";
import activityRouter from "./routes/activity.routes.js";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/activity", activityRouter);

app.get("/", (req, res) => {
  res.send("Welcome to TimeLogger");
});
app.listen(process.env.PORT, async () => {
  console.log("App is listening");
  await connectToDb();
});
