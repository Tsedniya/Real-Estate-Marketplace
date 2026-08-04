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

// ---------- MongoDB connection ----------
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO) {
    throw new Error("MONGO environment variable is missing");
  }

  console.log("🔄 Connecting to MongoDB...");

  await mongoose.connect(process.env.MONGO, {
    bufferCommands: false,
  });

  isConnected = true;

  console.log("✅ Connected to MongoDB successfully");
};

// ---------- Middleware ----------
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

// ---------- MongoDB middleware ----------
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Database connection failed",
    });
  }
});

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("Real Estate API is running 🚀");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

// ---------- Error handler ----------
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

// ---------- Export for Vercel ----------
export default app;