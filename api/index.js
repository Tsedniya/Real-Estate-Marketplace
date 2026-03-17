import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import listingRoutes from './routes/listing.route.js'
import uploadRoute from "./routes/upload.route.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log(err))

const app = express()

// serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:5176"],
  credentials: true
}));

app.use(express.json());  
app.use(cookieParser());

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes) 
app.use('/api/listing', listingRoutes);
app.use("/api/upload", uploadRoute);

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})

app.listen(3000, () => {
  console.log('server is running on port 3000 !!')
})