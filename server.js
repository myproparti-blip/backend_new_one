// ---------------------------------------------------
// server.js (Production-Ready / Render Compatible)
// ---------------------------------------------------

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// ---------------------------------------------------
// ENVIRONMENT LOADING
// ---------------------------------------------------
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

// Initialize Cloudinary after env loads
await import("./src/config/cloudinary.js");

// ---------------------------------------------------
// EXPRESS APP
// ---------------------------------------------------
const app = express();

// ---------------------------------------------------
// GLOBAL MONGOOSE CACHED CONNECTION (VERCEL SAFE)
// ---------------------------------------------------
let globalConnection = globalThis.mongooseConnection;

async function connectDatabase() {
  if (globalConnection && globalConnection.readyState === 1) {
    return globalConnection;
  }

  globalConnection = await connectDB();
  globalThis.mongooseConnection = globalConnection;

  return globalConnection;
}

// ---------------------------------------------------
// CORS
// ---------------------------------------------------
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://valuation-qb2y.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (origin.endsWith(".vercel.app")) return callback(null, true);
      console.warn("❌ CORS Blocked Origin:", origin);
      return callback(null, false);
    },
    credentials: true,
  })
);

// ---------------------------------------------------
// BODY PARSER
// ---------------------------------------------------
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------
// AUTO DB CONNECTOR
// ---------------------------------------------------
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    res.status(503).json({
      message: "Database unavailable",
      error: error.message,
    });
  }
});

// ---------------------------------------------------
// PUBLIC ROUTES (NO AUTH MIDDLEWARE)
// ---------------------------------------------------
import authRoutes from "./src/routes/authRoutes.js";
app.use("/api/auth", authRoutes); // LOGIN IS PUBLIC

import deepseekStream from "./src/routes/deepSeekStream.js";
app.use("/api", deepseekStream); // AI STREAM IS PUBLIC

// ---------------------------------------------------
// AUTH MIDDLEWARE (PROTECT EVERYTHING BELOW)
// ---------------------------------------------------
import { authMiddleware } from "./src/middleware/authMiddleware.js";
app.use("/api", authMiddleware);

// ---------------------------------------------------
// PROTECTED ROUTES
// ---------------------------------------------------
import imageRoutes, { documentRouter } from "./src/routes/imageRoutes.js";
import customOptionsRoutes from "./src/routes/customOptionsRoutes.js";
import billRoutes from "./src/routes/billRoutes.js";
import ubiApfRoutes from "./src/routes/ubiApfRoutes.js";
import valuationRoutes from "./src/routes/ubiShopRoutes.js";
import rajeshHouseRoutes from "./src/routes/rajeshHouseRoutes.js";
import rajeshRowHouseRoutes from "./src/routes/rajeshRowHouseRoutes.js"
import rajeshBankRoutes from "./src/routes/rajeshBankRoutes.js";
import rajeshFlatRoutes from "./src/routes/rajeshFlatRoutes.js";
import bofMaharastraRoutes from "./src/routes/bomFlatRoutes.js";

app.use("/api/valuations", valuationRoutes);
app.use("/api/rajesh-house", rajeshHouseRoutes);
app.use("/api/rajesh-rowhouse", rajeshRowHouseRoutes);

app.use("/api/rajesh-bank", rajeshBankRoutes);
app.use("/api/rajesh-flat", rajeshFlatRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/documents", documentRouter);
app.use("/api/options", customOptionsRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/ubi-apf", ubiApfRoutes);
app.use("/api/bof-maharashtra", bofMaharastraRoutes);

// ---------------------------------------------------
// ROOT CHECK
// ---------------------------------------------------
app.get("/", (req, res) => {
  res.send("🚀 MERN Backend Running – Production Optimized");
});

// ---------------------------------------------------
// START SERVER
// ---------------------------------------------------
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  const mode =
    process.env.NODE_ENV === "production" ? "Production" : "Development";
  (`🚀 ${mode} Server: http://localhost:${PORT}`);
});

// Error handling
server.on("error", (err) => {
  console.error("❌ Server Error:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

export default app;