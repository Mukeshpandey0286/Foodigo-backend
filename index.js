import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as testRoutes } from "./routes/testRoutes.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as resturantRoutes } from "./routes/resturantRoutes.js";
import { router as categoryRoutes } from "./routes/categoryRoutes.js";
import { router as foodRoutes } from "./routes/foodRoutes.js";
import { connectDb } from "./config/db.js";

// dotenv configure
dotenv.config();

// mongodb connection function call

connectDb();

// express initiated -- 1 step
const app = express();

// middlewares -->>
// enable cors for cross orgin web
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// port configuration
const PORT = process.env.PORT || 8080;

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resturant", resturantRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/food", foodRoutes);
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Your server is running successfully!! </h1>");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.red.bgYellow);
});
