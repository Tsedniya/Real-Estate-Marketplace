import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error("MONGO environment variable is missing");
    }

    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO, {
      bufferCommands: false,
    });

    console.log("✅ Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error(err.message);
    throw err;
  }
};

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://real-estate-marketplace-frontend-xi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Real Estate API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();